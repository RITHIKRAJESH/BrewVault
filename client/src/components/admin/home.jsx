import { useState, useEffect } from "react";
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItemText, ListItemButton, 
  Collapse, Box, CssBaseline, IconButton, useMediaQuery, useTheme, 
  Container, Grid, Paper
} from "@mui/material";
import { Home, People, ExpandLess, ExpandMore, Menu, Logout, Person, TipsAndUpdates } from "@mui/icons-material";
import { useNavigate, Routes, Route } from "react-router-dom";
import ViewUsers from "./viewuser"; 
import Profile from "./profile";
import Tips from "./addTips"; 
import axios from "axios";

const drawerWidth = 240;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 
  const [openUsersMenu, setOpenUsersMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState({ farmers: 0, wholesalers: 0, retailers: 0, tips: 0 });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/counts`);
      setCounts(response.data);
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

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
        open
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: isMobile ? 0 : `${drawerWidth}px`, transition: "margin 0.3s ease-in-out" }}>
        <Toolbar />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                <Typography variant="h6">Farmers</Typography>
                <Typography variant="h4">{counts.farmers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                <Typography variant="h6">Wholesalers</Typography>
                <Typography variant="h4">{counts.wholesalers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                <Typography variant="h6">Retailers</Typography>
                <Typography variant="h4">{counts.retailers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                <Typography variant="h6">Tips</Typography>
                <Typography variant="h4">{counts.tips}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        
        {/* ROUTES FOR DYNAMIC CONTENT */}
        <Routes>
          <Route path="/admin/users" element={<ViewUsers />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/tips" element={<Tips />} />
        </Routes>
      </Box>
    </Box>
  );
}