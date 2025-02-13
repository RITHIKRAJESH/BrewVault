import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          WELCOME TO HOME PAGE
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
            REGISTER
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>
            LOGIN
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
