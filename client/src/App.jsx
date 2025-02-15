import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProductDetails from "./components/wholesaler/addproducts";
import Viewproducts from "./components/farmer/viewproducts";
import ViewTips from "./components/farmer/tips";

// Lazy Load Components
const Homepage = lazy(() => import("./components/homepage"));
const UserForm = lazy(() => import("./components/register"));
const LoginForm = lazy(() => import("./components/login"));

// Farmer Components
const FarmerHome = lazy(() => import("./components/farmer/home"));
const Profile = lazy(() => import("./components/farmer/profile"));

// Admin Components
const Adminhome = lazy(() => import("./components/admin/home"));
const Adminviewusers = lazy(() => import("./components/admin/viewuser"));
const AdminProfile = lazy(() => import("./components/admin/profile"));
const AddTips = lazy(() => import("./components/admin/addTips"));

// Wholesaler Components
const WholesaleDashboard = lazy(() => import("./components/wholesaler/home"));
const WholesaleProfile = lazy(() => import("./components/wholesaler/profile"));

function App() {
  return (
    <Suspense fallback={<h2 style={{ textAlign: "center", marginTop: "20%" }}>Loading...</h2>}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<UserForm />} />
        <Route path="/login" element={<LoginForm/>} />

        {/* Farmer */}
        <Route path="/farmer" element={<FarmerHome />} />
        <Route path="/farmer/profile" element={<Profile />} />
        <Route path="/farmer/market"element={<Viewproducts/>}/> 
        <Route path="/farmer/viewtips" element={<ViewTips/>}/>
        {/* Admin */}
        <Route path="/admin" element={<Adminhome />} />
        <Route path="/admin/users" element={<Adminviewusers />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/tips" element={<AddTips />} />

        {/* Wholesaler */}
        <Route path="/wholesale" element={<WholesaleDashboard />} />
        <Route path="/wholesale/profile" element={<WholesaleProfile />} />
        <Route path="/wholesale/products" element={<AddProductDetails/>}/>
              </Routes>
    </Suspense>
  );
}

export default App;
