import { Link } from "react-router-dom"

export default function Notfound(){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-8xl font-bold">
                404
            </h1>

            <h2 className="text-3xl mt-4 font-semibold">Page Not Found</h2>
            <p className="mt-3 opacity-80">The page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white">
            Go Home
            </Link>
        </div>
    )
}