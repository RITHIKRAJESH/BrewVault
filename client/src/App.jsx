import { Route, Routes } from "react-router-dom"
import Homepage from "./components/homepage"
import UserForm from "./components/register"
import LoginForm from "./components/login"
import FarmerHome from "./components/farmer/home"
import Adminhome from "./components/admin/home"
import Adminviewusers from "./components/admin/viewuser"
import 'bootstrap/dist/css/bootstrap.min.css';
import WholesaleDashboard from "./components/wholesaler/home"
import Profile from "./components/farmer/profile"
import AdminProfile from "./components/admin/profile"
import WholesaleProfile from "./components/wholesaler/profile"

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<UserForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
       
        {/* farmer */}
        <Route path="/farmer" element={<FarmerHome/>}/>
        <Route path="/farmer/profile" element={<Profile/>}/>
        {/* Admin */}
        <Route path="/admin" element={<Adminhome/>}/>
        <Route path="/admin/users" element={<Adminviewusers/>}/>
        <Route path="/admin/profile" element={<AdminProfile/>}/>
        {/* Wholesaler */}
        <Route path="/wholesale" element={<WholesaleDashboard/>}/>
        <Route path="/wholesale/profile" element={<WholesaleProfile/>}/>
        

      </Routes>
    </>
  )
}

export default App
