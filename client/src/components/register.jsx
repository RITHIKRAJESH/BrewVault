import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "", // Store the user type (wholesaler, retailer, or farmer)
    shopOrFarmName: "", // For storing shop or farm name
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
    axios
      .post(`${url}/user/registeruser`, formData)
      .then((res) => {
        alert(res.data.msg);
        if (res.data.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          User Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>User Type</InputLabel>
            <Select
              label="User Type"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <MenuItem value="wholesaler">Wholesaler</MenuItem>
              <MenuItem value="retailer">Retailer</MenuItem>
              <MenuItem value="farmer">Farmer</MenuItem>
            </Select>
            <FormHelperText>Select your type</FormHelperText>
          </FormControl>

          {formData.userType && (
            <TextField
              fullWidth
              label={formData.userType === "farmer" ? "Farm Name" : "Shop Name"}
              name="shopOrFarmName"
              value={formData.shopOrFarmName}
              onChange={handleChange}
              margin="normal"
            />
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserForm;
