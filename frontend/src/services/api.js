import axios from "axios"


const API = axios.create({baseURL:"http://localhost:5000/api"})

API.interceptors.request.use((config) =>{

    const token = localStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

/* Auth APIS */

export const registerUser = async (userData) => {
    const response = await API.post(
        "/auth/register",
        userData
    )

    return response.data
}

export const loginUser = async (userData) =>{
    const response = await API.post("/auth/login",userData)
    return response.data
}

export const generateImage = async (
    prompt,
    style,
)=>{
    const response = await API.post(
        "/image/generate",
        {
            prompt,
            style,
        }
    )

    return response.data
}

/*profile APi*/

export const getProfile = async () =>{
    const response = await API.get("/auth/profile")
    return response.data
}

export default API