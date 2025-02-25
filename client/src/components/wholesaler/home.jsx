import { useState } from "react";
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItemText, ListItemButton, 
  Box, CssBaseline, IconButton, Divider 
} from "@mui/material";
import { Store, ShoppingCart, History, Person2, Logout, Menu as MenuIcon } from "@mui/icons-material";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProductDetails from "./addproducts";
import ViewOrders from "./vieworders";
import Profile from "../farmer/profile";

const drawerWidth = 240;

export default function WholesaleDashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
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
          <History sx={{ mr: 2 }} /> <ListItemText primary="Order History" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/wholesale/profile")}> 
          <Person2 sx={{ mr: 2 }} /> <ListItemText primary="Profile" />
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

      {/* AppBar for Mobile and Desktop */}
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton 
            color="inherit" 
            edge="start" 
            onClick={handleDrawerToggle} 
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Wholesale Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer (Permanent for Desktop, Temporary for Mobile) */}
      <Drawer
        variant="permanent"
        sx={{ 
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" }
        }}
      >
        {drawer}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<ViewOrders />} />
          <Route path="products" element={<AddProductDetails />} />
          <Route path="vieworders" element={<ViewOrders />} />
          <Route path="profile" element={<Profile />} />
          {/* Ensure an OrderHistory component is created before adding this route */}
          {/* <Route path="order-history" element={<OrderHistory />} /> */}
        </Routes>
      </Box>
    </Box>
  );
}
