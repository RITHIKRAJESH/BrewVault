import { useState } from "react";
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItemText, ListItemButton, 
  Collapse, Box, CssBaseline, IconButton, useMediaQuery, useTheme 
} from "@mui/material";
import { Home, People, ExpandLess, ExpandMore, Menu, Logout, Person, TipsAndUpdates } from "@mui/icons-material";
import { useNavigate, Routes, Route } from "react-router-dom";
import ViewUsers from "./viewuser"; 
import Profile from "./profile";
import Tips from "./addTips"; 

const drawerWidth = 240;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 
  const [openUsersMenu, setOpenUsersMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleUsersClick = () => setOpenUsersMenu(!openUsersMenu);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Sidebar Drawer Component
  const drawer = (
    <List>
      <ListItemButton onClick={() => navigate("/admin")}>
        <Home sx={{ mr: 2 }} />
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton onClick={handleUsersClick}>
        <People sx={{ mr: 2 }} />
        <ListItemText primary="Users" />
        {openUsersMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openUsersMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          <ListItemButton onClick={() => navigate("/admin/users")}>
            <ListItemText primary="All Users" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/admin/verifiedusers")}>
            <ListItemText primary="Verified Users" />
          </ListItemButton>
        </List>
      </Collapse>
    
      <ListItemButton onClick={() => navigate("/admin/tips")}>
        <TipsAndUpdates sx={{ mr: 2 }} />
        <ListItemText primary="Tips" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/admin/profile")}>
        <Person sx={{ mr: 2 }} />
        <ListItemText primary="Profile" />
      </ListItemButton>

      <ListItemButton onClick={() => {
        navigate("/");
        localStorage.clear();
      }}>
        <Logout sx={{ mr: 2 }} />
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`, ml: isMobile ? 0 : `${drawerWidth}px` }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content (Dynamic) */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          ml: isMobile ? 0 : `${drawerWidth}px`, 
          transition: "margin 0.3s ease-in-out", 
        }}
      >
        <Toolbar />

        {/* ROUTES FOR DYNAMIC CONTENT */}
        <Routes>
          <Route path="/admin/users" element={<ViewUsers />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/tips" element={<Tips />} />
          {/* Add more routes as needed */}
        </Routes>
      </Box>
    </Box>
  );
}
