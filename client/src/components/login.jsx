import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import img1 from '../assets/login.jpg'

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");  // OTP from backend
  const [otpEntered, setOtpEntered] = useState("");  // OTP entered by user
  const [newPassword, setNewPassword] = useState("");  // New password
  const [confirmPassword, setConfirmPassword] = useState("");  // Confirm new password
  const [passwordUpdated, setPasswordUpdated] = useState(false);  // Success flag
  const [passwordReset, setPasswordReset] = useState(false);  // OTP verified flag
  const navigate = useNavigate();
  // Update this URL with your backend URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtpEntered(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "" : "Valid email is required";
    tempErrors.password = formData.password ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const url = import.meta.env.VITE_BASE_URL;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post(`${url}/user/login`, formData)
        .then((res) => {
          alert(res.data.msg);
          const token = res.data.token;
          const decoded = jwtDecode(token);
          localStorage.setItem("token", token);
          localStorage.setItem("userId",decoded.payload._id)
          if (decoded.payload.role === "farmer" && res.data.status === 200 && decoded.payload.status=="approved") {
            navigate("/farmer");
          } else if (res.data.status === 200 && decoded.payload.role === "admin") {
            navigate("/admin");
          } else if (res.data.status === 200 && decoded.payload.role === "wholesaler") {
            navigate("/wholesale");
          }else if (res.data.status === 200 && decoded.payload.role === "retailer") {
            navigate("/retailer");}
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log(formData.email)
    axios.post(`${url}/user/forgot-password`, {email:formData.email})
      .then((res) => {
        alert(res.data.msg);
        localStorage.setItem("otp", res.data.otp); 
        setOtp(res.data.otp);
        setPasswordReset(true);  
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOtp = () => {
    if (otpEntered === otp) {
      setPasswordUpdated(false);
      alert("OTP Verified successfully. You can now reset your password.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    axios.put(`${url}/user/update-password`, {
      email: formData.email,
      otp: otpEntered,
      newPassword: newPassword,
    })
    .then((res) => {
      alert(res.data.msg);
      setPasswordUpdated(true); 
      navigate("/login")
    })
    .catch((err) => {
      console.log(err);
      alert("Error occurred while updating the password.");
    });
  };

  return (
    <div style={{ backgroundImage: 'linear-gradient(to right,rgb(142, 151, 147),rgb(155, 160, 156))',height:"100vH" }}>
    <Container maxWidth="sm" sx={{
          backgroundImage: `url(${img1})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0}}>
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 , backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
        <Typography variant="h5" gutterBottom>
          User Login
        </Typography>
        {!forgotPassword ? (
          <form onSubmit={handleSubmit}>
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
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Login
            </Button>
            <Box sx={{ mt: 2 }}>
              <Link href="#" variant="body2" onClick={handleForgotPassword}>
                Forgot Password?
              </Link>
            </Box>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <TextField
              fullWidth
              label="Enter your email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Reset Password
            </Button>
            <Box sx={{ mt: 2 }}>
              <Link href="#" variant="body2" onClick={() => setForgotPassword(false)}>
                Back to Login
              </Link>
            </Box>
          </form>
        )}
        {passwordReset && !passwordUpdated && (
          <form onSubmit={handlePasswordUpdate}>
            <TextField
              fullWidth
              label="Enter OTP"
              value={otpEntered}
              onChange={handleOtpChange}
              margin="normal"
            />
            <Button type="button" variant="contained" color="primary" onClick={verifyOtp}>
              Verify OTP
            </Button>
            {passwordReset && !passwordUpdated && (
              <>
                <TextField
                  fullWidth
                  label="Enter New Password"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Update Password
                </Button>
              </>
            )}
          </form>
        )}
      </Box>
    </Container>
    </div>
  );
};

export default LoginForm;
