
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItemText, ListItemButton, 
  Box, CssBaseline, 
} from "@mui/material";
import { Store, ShoppingCart, History,Person2,Logout  } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function WholesaleDashboard() {
  const navigate = useNavigate();
  
  

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" } }}
      >
        <Toolbar />
        <List>
          <ListItemButton onClick={() => navigate("/wholesale/products")}> <Store sx={{ mr: 2 }} /> <ListItemText primary="Products" /> </ListItemButton>
          <ListItemButton onClick={() => navigate("/wholesale/vieworders")}> <ShoppingCart sx={{ mr: 2 }} /> <ListItemText primary="Farmer Selections" /> </ListItemButton>
          <ListItemButton onClick={() => navigate("/wholesale/orders")}> <ShoppingCart sx={{ mr: 2 }} /> <ListItemText primary="Retailer Orders" /> </ListItemButton>
          <ListItemButton onClick={() => navigate("/wholesale/order-history")}> <History sx={{ mr: 2 }} /> <ListItemText primary="Order History" /> </ListItemButton>
          <ListItemButton onClick={() => navigate("/wholesale/profile")}> <Person2 sx={{ mr: 2 }} /> <ListItemText primary="Profile" /> </ListItemButton>
          <ListItemButton onClick={() => {navigate("/") 
             localStorage.clear()}}> <Logout sx={{ mr: 2 }} /> <ListItemText primary="Logout" /> </ListItemButton>
       
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar>
            <Typography variant="h6">Wholesale Admin Dashboard</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        
      </Box>
    </Box>
  );
}
