import { useEffect, useState } from "react";
import { 
  Container, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, 
  Fab, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function RetailerViewProducts() {
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    productImage: null,
    quantity: "",
    rate: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const token = jwtDecode(localStorage.getItem("token"));
  const [record, setRecord] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/retailer/viewproducts`, { headers: { userid: token.payload._id } })
      .then((res) => {
        setRecord(res.data);
      }).catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, productImage: e.target.files[0] });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    if (!product.productName || !product.productImage || !product.quantity || !product.rate) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (isNaN(product.quantity) || product.quantity <= 0) {
      setErrorMessage("Quantity must be a positive number.");
      return false;
    }

    if (isNaN(product.rate) || product.rate <= 0) {
      setErrorMessage("Rate must be a positive number.");
      return false;
    }

    setErrorMessage(""); // Clear any previous error
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields before submission
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productImage", product.productImage);
    formData.append("quantity", product.quantity);
    formData.append("rate", product.rate);
    formData.append("userid", token.payload._id);

    axios.post(`${import.meta.env.VITE_BASE_URL}/retailer/addproduct`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert(res.data.message);
        setRecord([...record, res.data.product]); // Update UI after adding product
      })
      .catch((err) => console.error(err));

    setOpenForm(false);
    setProduct({ productName: "", productImage: null, quantity: "", rate: "" });
  };

  // const handleUpdateQuantity = (productId, newQty) => {
  //   axios.put(`${import.meta.env.VITE_BASE_URL}/wholesaler/updateproduct`, { productId, quantity: newQty })
  //     .then((res) => {
  //       alert("Quantity updated successfully!");
  //       setRecord(record.map(item => item._id === productId ? { ...item, quantity: newQty } : item));
  //     })
  //     .catch((err) => console.error(err));
  // };

  const handleDeleteProduct = (productId) => {
    axios.delete(`${import.meta.env.VITE_BASE_URL}/wholesale/deleteretailproduct`,{headers:{id:productId}})
      .then((res) => {
        alert(res.data);
        setRecord(record.filter((item) => item._id !== productId)); // Remove from UI after deletion
      })
      .catch((err) => console.error(err));
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setOpenEditForm(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editProduct.productName || !editProduct.quantity || !editProduct.rate) {
      setErrorMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    if (editProduct.productImage) {
      formData.append("productImage", editProduct.productImage);
    }
    formData.append("quantity", editProduct.quantity);
    formData.append("rate", editProduct.rate);
    formData.append("userid", token.payload._id);

    axios.put(`${import.meta.env.VITE_BASE_URL}/retailer/updateproduct`, formData, {
      headers: { "Content-Type": "multipart/form-data" ,id:editProduct._id},
    })
      .then((res) => {
        alert(res.data.message);
        setRecord(record.map(item => item._id === editProduct._id ? { ...item, ...editProduct } : item));
        setOpenEditForm(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>View Products</Typography>

      {record.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Product Image</strong></TableCell>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Rate (₹)</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {record.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img src={product.productImage} alt={product.productName} width="50" height="50" />
                  </TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>₹{product.rate}</TableCell>
                  <TableCell>
                    {product.quantity === 0 ? (
                      <Typography color="error"><strong>Out of Stock</strong></Typography>
                    ) : product.quantity < 10 ? (
                      <Typography color="warning.main"><strong>Limited Stock</strong></Typography>
                    ) : (
                      <Typography color="success.main"><strong>In Stock</strong></Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditProduct(product)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={() => handleDeleteProduct(product._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No products available.</Typography>
      )}

      {/* Floating Button to Add Product */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => setOpenForm(true)}
      >
        <Add />
      </Fab>

      {/* Dialog Form to Add Product */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add a New Product</DialogTitle>
        <DialogContent>
          {/* Display error message */}
          {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}

          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "16px" }} />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Rate"
            name="rate"
            type="number"
            value={product.rate}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Add Product</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Form to Edit Product */}
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {/* Display error message */}
          {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}

          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            value={editProduct?.productName || ""}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <input type="file" accept="image/*" onChange={e => setEditProduct({ ...editProduct, productImage: e.target.files[0] })} style={{ marginBottom: "16px" }} />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={editProduct?.quantity || ""}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Rate"
            name="rate"
            type="number"
            value={editProduct?.rate || ""}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)} color="secondary">Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">Update Product</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
