import { useEffect, useState } from "react";
import { 
  Container,  Typography,Card,CardMedia,Grid,CardContent
} from "@mui/material";
// import { Add } from "@mui/icons-material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function RetailerViewproducts() {
  // const [openForm, setOpenForm] = useState(false);
  const token=jwtDecode(localStorage.getItem("token"))
  // const [product, setProduct] = useState({
  //   productName: "",
  //   productImage: null,
  //   quantity: "",
  //   rate: "",
    
  // });

  const [record,setRecord]=useState([])
 
  useEffect(()=>{
      axios.get(`${import.meta.env.VITE_BASE_URL}/retailer/viewproduct`)
      .then((res)=>{
        console.log(res.data)
        setRecord(res.data)
      }).catch((err)=>{console.log(err)})
  },[])

  // const handleChange = (e) => {
  //   setProduct({ ...product, [e.target.name]: e.target.value });
  // };

  // const handleFileChange = (e) => {
  //   setProduct({ ...product, productImage: e.target.files[0] });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("productName", product.productName);
  //   formData.append("productImage", product.productImage); // Ensure file is included
  //   formData.append("quantity", product.quantity);
  //   formData.append("rate", product.rate);
  //   formData.append("userid",token.payload._id);
  
  //   axios.post(`${import.meta.env.VITE_BASE_URL}/retailer/addproduct`, formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //   .then((res) => {
  //     alert(res.data.message);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  
  //   setOpenForm(false);
  //   setProduct({ productName: "", productImage: null, quantity: "", rate: "", userid:"" });
  // };
  
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>View Products</Typography>
      <Grid container spacing={3}>
        {record.length > 0 ? (
          record.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.productImage}
                  alt={product.productName}
                />
                <CardContent>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography color="text.secondary">
                    Quantity: {product.quantity}
                  </Typography>
                  <Typography color="text.secondary">
                    Rate: ₹{product.rate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No products available.</Typography>
        )}
      </Grid>
             



      {/* <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => setOpenForm(true)}
      >
        <Add />
      </Fab>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add a New Product</DialogTitle>
        <DialogContent>
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
      </Dialog> */}
    </Container>
  );
}
