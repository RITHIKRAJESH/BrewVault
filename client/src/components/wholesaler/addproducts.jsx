import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Grid
} from "@mui/material";
import { Add, Remove, Delete, Edit, Save } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function AddProductDetails() {
  const token = jwtDecode(localStorage.getItem("token"));
  const userId = token.payload._id;
  const [viewProducts, setViewProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [product, setProduct] = useState({
    productName: "",
    productImage: null,
    productCategory: [{ quality: "", price: "" }],
    date: "",
    userid: userId
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wholesale/viewproductbyid`, {
        headers: { userid: userId }
      })
      .then((res) => {
        setViewProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleCategoryEditChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCategories = [...selectedProduct.productCategory];
    updatedCategories[index][name] = value;
    setSelectedProduct({ ...selectedProduct, productCategory: updatedCategories });
  };

  const handleUpdate = async () => {
    console.log("Updated Product:", selectedProduct);
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/wholesale/updateproduct`,
        {
          productId: selectedProduct._id,
          date: selectedProduct.date,
          productCategory: selectedProduct.productCategory
        }
      );
  
      console.log("Update Response:", response.data);
      fetchProducts(); 
    } catch (err) {
      console.error("Error updating product:", err);
    }
  
    setOpenEditDialog(false);
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/wholesale/deleteproduct`, { headers: { _id: id } });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
        Product List
      </Typography>
      <Button onClick={() => navigate('/wholesale')}>BACK TO DASHBOARD</Button>
      
      <Grid container spacing={3}>
        {viewProducts.map((prod) => (
          <Grid item xs={12} sm={6} md={4} key={prod._id}>
            <Card sx={{ boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
              <CardMedia component="img" height="180" image={prod.productImage} alt={prod.productName} />
              <CardContent>
                <Typography variant="h6">{prod.productName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {prod.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Categories:
                </Typography>
                {prod.productCategory.map((cat, index) => (
                  <Typography key={index} variant="body2">
                    {cat.quality} - ${cat.price}
                  </Typography>
                ))}
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => handleEditClick(prod)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(prod._id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={selectedProduct.date}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6">Update Prices</Typography>
            {selectedProduct.productCategory.map((cat, index) => (
              <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
                <TextField
                  label="Quality"
                  name="quality"
                  value={cat.quality}
                  disabled
                  sx={{ width: "40%" }}
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={cat.price}
                  onChange={(e) => handleCategoryEditChange(index, e)}
                  sx={{ width: "40%" }}
                />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              <Save /> Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 20, right: 20, boxShadow: 4, "&:hover": { boxShadow: 6 } }}
        onClick={() => setOpenForm(true)}
      >
        <Add />
      </Fab>
    </Container>
  );
}
