import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { loginUser} from "../services/api"
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
export default function Login() {

    const navigate = useNavigate()
    const { login } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading]= useState(false)
    
    const handleLogin = async (e) => {
        e.preventDefault()

        try{
            setLoading(true)

            const data = await loginUser({
                email, 
                password})

            login(data.user,data.token)

            navigate("/")
        } catch (error){
            alert(error.response?.data?.message || "Login Failed")
        }finally{
            setLoading(false)
        }
    }

    return(
        <>
        <Navbar/>

        <div data-aos="fade-up" className="min-h-screen flex item-center justify-center px-6">
            <form onSubmit={handleLogin} className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">

            <h1 className="text-3xl font-bold text-center mb-6"> Welcome</h1>

            <div className="mb-4">
                <label className="block mb-2">Email</label>

                <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter email" className="w-full p-3 rounded-lg bg-white/20 outline-none border border-white/20"/>
            </div>

            <div className="mb-6">
                <label className="block mb-2">Password</label>
                <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}
                placeholder="Enter password" className="w-full p-3 rounded-lg bg-white/20 outline-none border border-white/20"/>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-lg text-white font-semibold">{
                loading? "Loggin in...":"Login"}

            </button>

            <p className=" text-center mt-5">Don't have an account?
                <Link to="/register" className="text-cyan-400 ml-2"> Register </Link>
            </p>

            </form>
        </div>
        <Footer/>
        </>
    )
}