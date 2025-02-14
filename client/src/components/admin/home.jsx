import { useState } from "react";
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItemText, ListItemButton, 
  Collapse, Box, CssBaseline, IconButton, useMediaQuery, useTheme 
} from "@mui/material";
import { Home, People, ExpandLess, ExpandMore, Menu,Logout, Person} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile screen
  const [openUsersMenu, setOpenUsersMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer

  const handleUsersClick = () => {
    setOpenUsersMenu(!openUsersMenu);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar Drawer Component
  const drawer = (
    <List>
      <ListItemButton onClick={() => navigate("/admin")}>
        <Home sx={{ mr: 2 }} />
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* Users Menu */}
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

      <ListItemButton onClick={() => navigate("/admin/profile")}>
        <Person sx={{ mr: 2 }} />
        <ListItemText primary="Profile" />
      </ListItemButton>

      
      <ListItemButton onClick={() => navigate("/admin/profile")}>
      <Logout sx={{ mr: 2 }} />
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar with Menu Icon for Mobile */}
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

      {/* Responsive Sidebar Drawer */}
      {/* Mobile Drawer (Temporary) */}
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

      {/* Desktop Drawer (Permanent) */}
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

      {/* Main Content Area (Shifts Correctly) */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          ml: isMobile ? 0 : `${drawerWidth}px`, // Adjust margin for sidebar
          transition: "margin 0.3s ease-in-out", // Smooth transition
        }}
      >
        <Toolbar /> {/* Keeps spacing below AppBar */}
        <Typography variant="h4">Welcome, Admin!</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Manage users, settings, and other administrative tasks from this dashboard.
        </Typography>
      </Box>
    </Box>
  );
}
