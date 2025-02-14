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
        {/* Wholesaler */}
        <Route path="/wholesale" element={<WholesaleDashboard/>}/>
        

      </Routes>
    </>
  )
}

export default App
