import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function profile(){

    const { user,logout } = useAuth()
    const navigate = useNavigate() 
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "")

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const handleAvatarChange = (e) =>{
        const file = e.target.files[0]
        if(!file) return 
        const reader = new FileReader()

        reader.onload = () =>{
            setAvatar(reader.result)
            localStorage.setItem("avatar",reader.result)
        }

        reader.readAsDataURL(file)
    }


    return(
        <>
        <Navbar/>

        <div className="min-h-screen flex items-center justify-center px-6">
            <div data-aos="fade-up" className="w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl">
             <div className="flex flex-col items-center">
                <div className="relative">{avatar?(<img src={avatar} alt="Avatar" className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"/>):(
                    <div className="w-28 h-28 rounded-full bg-grandient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white">{user?.name?.charAt(0)?.toUpperCase()||"U"}</div>
                )}</div>
                <label className="mt-4 cursor-pointer px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">Upload Avatar  <input type="file" accept="image" onChange={handleAvatarChange} className="hidden" /></label>
                <button onClick={()=>{
                    localStorage.removeItem("avatar")
                    setAvatar("")
                }} className="mt-3 px-5 py-2 rounde-xl bg-red-500 hover:bg-red-600 text-white">Remove</button>
              
                </div>
                <h1 className="text-3xl font-bold mt-5">{user?.name||"User"}</h1>
                <p className="opcaity-80 mt-2">{user?.email || "No Email"}</p>
             </div>
             <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div className="p-5 rounded-xl bg-white/10">
                <h2 className="font-bold text-xl mb-4">Account Information</h2>
                <p>
                    Name:{user?.name}
                </p>
                <p>
                    Email:{user?.email}
                </p>

                <button onClick={handleLogout} className="mt-6 px-6 py-3 bg-red-500 rounded-xl text-white">Logout</button>
                </div>
             </div>
             <div className="p-5 rounded-xl bg-white/10"><h2 className="font-bold text-xl mb-2">AI Statistics</h2>
             <p>Total Image:0</p>
             <p>Downloads:0</p>
             <p>Account Type:free</p>
             </div>
            </div>
        <footer/>
        </>
    )
}