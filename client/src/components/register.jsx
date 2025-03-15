import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import img1 from '../assets/registration.webp'
const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",  // Added confirmPassword field
    role: "",
    shopOrFarmName: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = formData.username ? "" : "Username is required";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "" : "Valid email is required";
    tempErrors.password = formData.password.length >= 6 ? "" : "Password must be at least 6 characters";
    tempErrors.role = formData.role ? "" : "User type is required";
    tempErrors.mobile = /^\d{10}$/.test(formData.mobile) ? "" : "Mobile number must be 10 digits";
    
    // Check if passwords match
    tempErrors.confirmPassword = formData.password === formData.confirmPassword ? "" : "Passwords must match";

    if (formData.role) {
      tempErrors.shopOrFarmName = formData.shopOrFarmName ? "" : formData.role === "farmer" ? "Farm Name is required" : "Shop Name is required";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
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
    }
  };

  return (
    <div style={{ backgroundImage: 'linear-gradient(to right,rgb(142, 151, 147),rgb(155, 160, 156))' }}>
    <Container maxWidth="sm" sx={{
      backgroundImage: `url(${img1})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0
    }}>
      <Box sx={{
        mt: 5, p: 3, boxShadow: 3, borderRadius: 2, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',  // semi-transparent white
        width: '100%', maxWidth: 500
      }}>
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
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          
          {/* Confirm Password field */}
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            type="text"
            value={formData.mobile}
            onChange={handleChange}
            margin="normal"
            error={!!errors.mobile}
            helperText={errors.mobile}
          />
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel>User Type</InputLabel>
            <Select
              label="User Type"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="wholesaler">Wholesaler</MenuItem>
              <MenuItem value="retailer">Retailer</MenuItem>
              <MenuItem value="farmer">Farmer</MenuItem>
            </Select>
            <FormHelperText>{errors.role}</FormHelperText>
          </FormControl>

          {formData.role && (
            <TextField
              fullWidth
              label={formData.role === "farmer" ? "Farm Name" : "Shop Name"}
              name="shopOrFarmName"
              value={formData.shopOrFarmName}
              onChange={handleChange}
              margin="normal"
              error={!!errors.shopOrFarmName}
              helperText={errors.shopOrFarmName}
            />
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
    </div>
  );
};

export default UserForm;
