import { useEffect, useState } from "react";
import {
  Container, Typography, Card, CardMedia, Grid, CardContent, Button
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function RetailerViewProducts() {
  // Decode token and get the userId from localStorage
  const token = jwtDecode(localStorage.getItem("token"));
  const userId = token.payload._id;

  const [record, setRecord] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch products from the server
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/retailer/viewproduct`)
      .then((res) => {
        setRecord(res.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error fetching products.");
      });
  }, []);

  // Handle adding product to the cart
  const handleAddToCart = (product) => {
    if (!userId) {
      setErrorMessage("User is not logged in.");
      return;
    }

    const cartItem = {
      productId: product._id,
      productName: product.productName,
      quantity: 5, // You can change this based on the quantity selection in the UI
      rate: product.rate,
      userId: userId, // Use the decoded userId from the token
    };

    // Call an API endpoint to add the product to the user's cart
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/retailer/addCart`, cartItem)
      .then((res) => {
        alert(res.data.message || "Product added to cart successfully.");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error adding product to cart.");
      });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>View Products</Typography>

      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

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
  Quantity: {product.quantity} {product.quantity <= 10 && <span>Limited stock</span>}
</Typography>

                  <Typography color="text.secondary">
                    Rate: ₹{product.rate}
                  </Typography>
                 

                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No products available.</Typography>
        )}
      </Grid>
    </Container>
  );
}
