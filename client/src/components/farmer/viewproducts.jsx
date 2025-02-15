import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardMedia, CardContent, Typography, Button, TextField, Grid, Container} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewProducts() {
  const [products, setViewProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wholesale/viewproduct`)
      .then((res) => {
        setViewProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddProduct = (product) => {
    console.log("Adding Product:", product.productName, "Quantity:", quantities[product._id] || 1);
    alert(`Added ${quantities[product._id] || 1} of ${product.productName}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
       <Button onClick={()=>navigate('/farmer')}>BACK TO DASH BOARD </Button>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="180"
                image={`${import.meta.env.VITE_BASE_URL}/uploads/${product.productImage}`}
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

                {/* Quantity Input */}
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  value={quantities[product._id] || ""}
                  onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                />

                {/* Add Product Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleAddProduct(product)}
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
