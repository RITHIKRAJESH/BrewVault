import React from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, CssBaseline } from "@mui/material";
import { Home, People, Settings } from "@mui/icons-material";

const drawerWidth = 240;

export default function AdminDashboard() {
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
          {["Dashboard", "Users", "Settings"].map((text, index) => (
            <ListItem button key={text}>
              {index === 0 ? <Home sx={{ mr: 2 }} /> : index === 1 ? <People sx={{ mr: 2 }} /> : <Settings sx={{ mr: 2 }} />}
              <ListItemText primary={text} />
            </ListItem>
          ))}
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
