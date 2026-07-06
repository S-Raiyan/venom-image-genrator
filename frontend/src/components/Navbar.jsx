import { Link,useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

export default function Navbar(){

    const { user , logout, isAuthenticated}= useAuth()

    const {  theme, toggleTheme }= useTheme()

    const navigate = useNavigate()

    const handleLogout=()=>{
        logout();
        navigate("/login")
    }

    return(
          <nav className=" sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 px-6 py-4">

            <div className="max-w-7xl mx-auto flex justify-between item-center">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                venom AI
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:text-cyan-400 transition">
                    Home
                    </Link>

                    {isAuthenticated && (
                        <Link to="/profile" className="hover:text-cyan-400 transition">
                            profile
                        </Link>
                    )}

                    {/*<button onClick={toggleTheme} className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
                    {theme === "dark"? "☀️" : "🌙"}
                    </button>*/}

                    {isAuthenticated ?(
                        <> <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white">
                            {user?.name?.charAt(0)?.toUpperCase()||"u"}
                        </div>
                        </>
                    ) : (
                        <>
                          <Link to="/login" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                        Login
                        </Link>
                        
                        <Link to="/register" className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition">
                        Register
                        </Link>
                       

        
                        </>

                    )}
                </div>
            </div>

          </nav>
    )
}