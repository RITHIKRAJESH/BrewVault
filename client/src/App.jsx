import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RetailerProfile from "./components/retailer/profile";
import RetailerViewproducts from "./components/retailer/viewproducts";

// Lazy Load Components
const Homepage = lazy(() => import("./components/homepage"));
const UserForm = lazy(() => import("./components/register"));
const LoginForm = lazy(() => import("./components/login"));

// Farmer Components
const FarmerHome = lazy(() => import("./components/farmer/home"));


// Admin Components
const AdminHome = lazy(() => import("./components/admin/home"));


// Wholesaler Components
const WholesaleDashboard = lazy(() => import("./components/wholesaler/home"));


//Retailer Components
const RetailerDashboard=lazy(()=> import("./components/retailer/home"))

function App() {
  return (
    <Suspense fallback={<h2 style={{ textAlign: "center", marginTop: "20%" }}>Loading...</h2>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Farmer Routes */}
        <Route path="/farmer/*" element={<FarmerHome />} />
        {/* <Route path="/farmer/profile" element={<Profile />} />
        <Route path="/farmer/market" element={<ViewProducts />} />
        <Route path="/farmer/viewtips" element={<ViewTips />} />
        <Route path="/farmer/my-products" element={<MyProduct />} /> */}

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminHome />} />
       

        {/* Wholesaler Routes */}
        <Route path="/wholesale/*" element={<WholesaleDashboard />} />
     

        {/* Retailer Routes */}
        <Route path="/retail" element={<RetailerDashboard/>}/>
        <Route path="/retailer/profile" element={<RetailerProfile/>}/>
        <Route path="/retailer/viewproducts" element={<RetailerViewproducts/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
