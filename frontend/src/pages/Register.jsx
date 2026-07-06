import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Register(){

    const navigate = useNavigate()

    const { login } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const handleRegister = async (e) =>{
        e.preventDefault()

        if(password !== confirmPassword){
            alert("passwords do not match")
            return
        }
        try{
            setLoading(true)

            const data = await registerUser({name,email,password})

            login(
                data.user,
                data.token
            )

            navigate("/")
        }catch (error){
            alert(
                error.response?.data?.message || "Register failed"
            )

        } finally{
            setLoading(false)
        }
    }

    return(
        <>
        <Navbar/>
        <div data-aos="fade-up" className="min-h-screen flex items-center justify-center px-6">
            <form onSubmit={handleRegister} className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
              <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="enter Name" className="w-full p-3 rounded-lg bg-white/20 border border-white/20 outline-none"/>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input type ="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="w-full p-3 rounded-lg bg-white/20 border border-white/20 outline-none"/>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="w-full p-3 rounded=lg b-white/20 border border-white/20 outlin-none"/>
              </div>

              <div className="mb-6">
                <label className="block mb-2">confirm Password</label>
                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" className="w-full p-3 rounded-lg bg-white/20 border border-white/20 outline-none"/>
              </div>
                <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-semibold">    
                    {
                    loading
                      ? "creating Account..."
                      : "Register"
                 }
                 </button>
                 <p className="text-center mt-5">Already have an account?
                 <Link to="/login" className="text-cyan-400 ml-2">Login</Link>
                 </p>


            </form>
        </div>
        <Footer/>
        </>
    )
}