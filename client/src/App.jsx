import { Route, Routes } from "react-router-dom"
import Homepage from "./components/homepage"
import UserForm from "./components/register"
import LoginForm from "./components/login"
import FarmerHome from "./components/farmer/home"
import Adminhome from "./components/admin/home"

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<UserForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/farmer" element={<FarmerHome/>}/>
        <Route path="/admin" element={<Adminhome/>}/>
      </Routes>
    </>
  )
}

export default App
