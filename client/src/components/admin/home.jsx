
import { useState } from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItemText, ListItemButton, Collapse, Box, CssBaseline } from "@mui/material";
import { Home, People, ExpandLess, ExpandMore,} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [openUsersMenu, setOpenUsersMenu] = useState(false);

  const handleUsersClick = () => {
    setOpenUsersMenu(!openUsersMenu);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {/* Dashboard */}
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
                <ListItemText primary="Profile" />
              </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* For spacing */}
        
        {/* Content Goes Here */}
        <Typography variant="h4">Welcome, Admin!</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Manage users, settings, and other administrative tasks from this dashboard.
        </Typography>
      </Box>
    </Box>
  );
}
