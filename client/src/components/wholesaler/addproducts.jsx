// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   IconButton,
//   Card,
//   CardContent,
//   CardActions,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Fab,
//   Grid
// } from "@mui/material";
// import { Add, Remove, Delete, Edit ,Save} from "@mui/icons-material";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// export default function AddProductDetails() {
//   const token = jwtDecode(localStorage.getItem("token"));
//   const userId = token.payload._id;
//   const [viewProducts, setViewProducts] = useState([]);
//   const [openForm, setOpenForm] = useState(false);
//   const [message, setMessage] = useState("");
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const [product, setProduct] = useState({
//     productName: "",
//     productImage: null,
//     productCategory: [{ quality: "", price: "" }],
//     date: "",
//     userid: userId
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     axios
//       .get(`${import.meta.env.VITE_BASE_URL}/wholesale/viewproductbyid`, {
//         headers: { userid: userId }
//       })
//       .then((res) => {
//         setViewProducts(res.data);
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   };

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleCategoryChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedCategories = [...product.productCategory];
//     updatedCategories[index][name] = value;
//     setProduct({ ...product, productCategory: updatedCategories });
//   };

//   const handleFileChange = (e) => {
//     setProduct({ ...product, productImage: e.target.files[0] });
//   };

//   const addCategory = () => {
//     setProduct({ ...product, productCategory: [...product.productCategory, { quality: "", price: "" }] });
//   };

//   const removeCategory = (index) => {
//     const updatedCategories = [...product.productCategory];
//     updatedCategories.splice(index, 1);
//     setProduct({ ...product, productCategory: updatedCategories });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!product.productName || !product.productImage || !product.date) {
//       setMessage("All fields are required!");
//       return;
//     }
    

//     const formData = new FormData();
//     formData.append("productName", product.productName);
//     formData.append("productImage", product.productImage);
//     formData.append("date", product.date);
//     formData.append("userid", product.userid);
//     formData.append("productCategory", JSON.stringify(product.productCategory));

//     try {
//       await axios.post(`${import.meta.env.VITE_BASE_URL}/wholesale/addproduct`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage("Product added successfully!");
//       fetchProducts();
//       setOpenForm(false);
//       setProduct({ productName: "", productImage: null, productCategory: [{ quality: "", price: "" }], date: "" });
//     } catch (err) {
//       setMessage("Server error. Try again later.",err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_BASE_URL}/wholesale/deleteproduct`,{headers:{_id:id}});
//       fetchProducts();
//     } catch (err) {
//       console.error("Error deleting product:", err);
//     }
//   };
//  const navigate=useNavigate()
//  const handleEditClick = (product) => {
//   setSelectedProduct(product);
//   setOpenEditDialog(true);
// };

// const handleEditChange = (e) => {
//   const { name, value } = e.target;
//   setSelectedProduct({ ...selectedProduct, [name]: value });
// };

// const handleCategoryEditChange = (index, e) => {
//   const { name, value } = e.target;
//   const updatedCategories = [...selectedProduct.productCategory];
//   updatedCategories[index][name] = value;
//   setSelectedProduct({ ...selectedProduct, productCategory: updatedCategories });
// };
//  const handleUpdate = async () => {
//   console.log("Updated Product:", selectedProduct);

//   try {
//     const response = await axios.put(
//       `${import.meta.env.VITE_BASE_URL}/wholesale/updateproduct`,
//       {
//         productId: selectedProduct._id,
//         date: selectedProduct.date,
//         productCategory: selectedProduct.productCategory
//       }
//     );

//     console.log("Update Response:", response.data);
//     fetchProducts(); // Refresh product list
//   } catch (err) {
//     console.error("Error updating product:", err);
//   }

//   setOpenEditDialog(false);
// };

//   return (
//     <Container maxWidth="md" sx={{ mt: 5 }}>
//       <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
//         Product List
//       </Typography>
//       <Button onClick={()=>navigate('/wholesale')}>BACK TO DASH BOARD </Button>
//       <Grid container spacing={3}>
//         {viewProducts.map((prod) => (
//           <Grid item xs={12} sm={6} md={4} key={prod._id}>
//             <Card sx={{ boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
//             <CardMedia
//   component="img"
//   height="180"
//   image={prod.productImage}
//   alt={prod.productName}
// />

//               <CardContent>
//                 <Typography variant="h6">{prod.productName}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Date: {prod.date}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Categories:
//                 </Typography>
//                 {prod.productCategory.map((cat, index) => (
//                   <Typography key={index} variant="body2">
//                     {cat.quality} - ${cat.price}
//                   </Typography>
//                 ))}
//               </CardContent>
//               <CardActions>
//                 <IconButton color="primary">
//                   <Edit color="primary" onClick={() => handleEditClick(prod)} />
//                 </IconButton>
//                 <IconButton color="error" onClick={() => handleDelete(prod._id)}>
//                   <Delete />
//                 </IconButton>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Fab
//         color="primary"
//         sx={{
//           position: "fixed",
//           bottom: 20,
//           right: 20,
//           boxShadow: 4,
//           "&:hover": { boxShadow: 6 },
//         }}
//         onClick={() => setOpenForm(true)}
//       >
//         <Add />
//       </Fab>

//       <Dialog open={openForm} onClose={() => setOpenForm(false)}>
//         <DialogTitle>Add a New Product</DialogTitle>
//         <DialogContent>
//           {message && <Typography color="error">{message}</Typography>}

//           <TextField
//             fullWidth
//             label="Product Name"
//             variant="outlined"
//             name="productName"
//             value={product.productName}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//           />

//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "16px" }} />

//           <TextField
//             fullWidth
//             type="date"
//             variant="outlined"
//             name="date"
//             value={product.date}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//           />

//           <Typography variant="h6">Product Categories</Typography>
//           {product.productCategory.map((cat, index) => (
//             <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
//               <TextField label="Quality" name="quality" value={cat.quality} onChange={(e) => handleCategoryChange(index, e)} />
//               <TextField label="Price" name="price" type="number" value={cat.price} onChange={(e) => handleCategoryChange(index, e)} />
//               {index > 0 && (
//                 <IconButton onClick={() => removeCategory(index)} color="error">
//                   <Remove />
//                 </IconButton>
//               )}
//             </Box>
//           ))}

//           <Button onClick={addCategory} startIcon={<Add />} sx={{ mb: 2 }}>
//             Add More
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Submit Product
//           </Button>
//         </DialogActions>
//       </Dialog>
//        {/* Edit Product Dialog */}
//        {selectedProduct && (
//         <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
//           <DialogTitle>Edit Product</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Date"
//               type="date"
//               name="date"
//               value={selectedProduct.date}
//               onChange={handleEditChange}
//               sx={{ mb: 2 }}
//             />
//             <Typography variant="h6">Update Prices</Typography>
//             {selectedProduct.productCategory.map((cat, index) => (
//               <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
//                 <TextField
//                   label="Quality"
//                   name="quality"
//                   value={cat.quality}
//                   disabled
//                   sx={{ width: "40%" }}
//                 />
//                 <TextField
//                   label="Price"
//                   name="price"
//                   type="number"
//                   value={cat.price}
//                   onChange={(e) => handleCategoryEditChange(index, e)}
//                   sx={{ width: "40%" }}
//                 />
//               </Box>
//             ))}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEditDialog(false)} color="secondary">
//               Cancel
//             </Button>
//             <Button onClick={handleUpdate} variant="contained" color="primary">
//               <Save /> Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Container>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { 
  Card, CardMedia, CardContent, Typography, Button, 
  TextField, Grid, Container 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddProductDetails() {
  const [products, setViewProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [pickupLocations, setPickupLocations] = useState({});
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]); 
  const navigate = useNavigate();

  // Get user ID from token
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.payload?._id; // Ensure correct token structure
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wholesale/viewproduct`)
      .then((res) => {
        setViewProducts(res.data);
        console.log("Fetched products:", res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handlePickupLocationChange = (id, value) => {
    setPickupLocations((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddProduct = (product) => {
    const quantity = quantities[product._id] || 1; // Default to 1 if not entered
    const pickupLocation = pickupLocations[product._id] || ""; // Default empty string
    const productData = {
      productId: product._id,
      userId: userId,
      quantity: quantity,
      pickupLocation: pickupLocation,
    };
    const url = import.meta.env.VITE_BASE_URL;
    
    // Update the selected products state
    setSelectedProducts((prev) => [...prev, productData]);
     axios.post(`${url}/wholesale/productpurchased`, productData)
     .then((res) => {
      alert(res.data);
    
     }).catch((err) => console.log(err));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => navigate('/farmer')}>BACK TO DASHBOARD</Button>

      {/* Search Filter */}
      <TextField
        fullWidth
        label="Search Product"
        variant="outlined"
        size="small"
        sx={{ mt: 2, mb: 3 }}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <Grid container spacing={3}>
        {products
          .filter((product) => 
            product.productName.toLowerCase().includes(search)
          )
          .map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={product.productImage}
                  alt={product.productName}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Categories:
                  </Typography>
                  {product.productCategory.map((cat, index) => (
                    <Typography key={index} variant="body2">
                      {cat.quality} - Rs.{cat.price}
                    </Typography>
                  ))}
                  <Typography variant="body2" color="textSecondary">
                    Date: {product.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
  {product.quantity == 0 ? "Out of Stock" : `Quantity: ${product.quantity}`}
</Typography>

                  {/* Quantity Input */}
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    value={quantities[product._id] || ""}
                    placeholder="Amount of qty you want to sell"
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    required
                  />

                  {/* Pickup Location Input */}
                  {/* <TextField
  fullWidth
  label="Pickup Location"
  variant="outlined"
  size="large"
  sx={{mt: 2,}}
  value={pickupLocations[product._id] || ""}
  placeholder="Enter pickup location"
  onChange={(e) => handlePickupLocationChange(product._id, e.target.value)}
  required
/> */}

                  {/* Add Product Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleAddProduct(product)}
                    disabled={!quantities[product._id]}
                  >
                    Add Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
