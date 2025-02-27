import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  ListItemText,
  Box,
  CssBaseline,
  IconButton,
  Divider,
  useMediaQuery,
  ListItemButton,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Profile from "./profile";
import AddProductDetails from "./addproducts";
import ViewOrders from "./vieworders";
import OrderHistory from "./orderhistory";  // Importing the OrderHistory component
import { Logout, Person, ShoppingCart, Store,HistoryEdu} from "@mui/icons-material";

const drawerWidth = 240;

export default function WholesaleDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile screen
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile drawer state

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton onClick={() => navigate("/wholesale/products")}> 
          <Store sx={{ mr: 2 }} /> <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/wholesale/vieworders")}> 
          <ShoppingCart sx={{ mr: 2 }} /> <ListItemText primary="Farmer Selections" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/wholesale/order-history")}> 
          <HistoryEdu sx={{ mr: 2 }} /> <ListItemText primary="Order History" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/wholesale/profile")}> 
          <Person sx={{ mr: 2 }} /> <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/"); 
            localStorage.clear();
          }}
        >
          <Logout sx={{ mr: 2 }} /> <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar with Menu Icon for Mobile */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            WholeSale Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar for Desktop (Permanent) */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Routes>
          <Route path="/" element={<ViewOrders />} />
          <Route path="products" element={<AddProductDetails />} />
          <Route path="vieworders" element={<ViewOrders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order-history" element={<OrderHistory />} />
        </Routes>
      </Box>
    </Box>
  );
}
