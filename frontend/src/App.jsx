import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"

import ProtectedRoute from "./components/ProtectedRoute"

export default function App(){

  useEffect(()=>{
    AOS.init({
      duration:1000,
      once:false,
      offset:100,
    })
  },[])

  return(
    <Routes>
      {/*public route*/}
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>

      {/*Protected Routes */}

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="*" element={<NotFound/>}/>

    </Routes>
  )

}