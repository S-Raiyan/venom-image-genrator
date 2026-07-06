import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { generateImage } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home(){

    const [prompt, setPrompt] = useState("")
    const [style, setStyle] = useState("Realistic")

    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [progress, setprogress] = useState(0)
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    

    const templates = ["cyberpunk City at night",
        "Anime Warrior","Fantasy Castle","Dragon King",
        "Space Station","Robot Soldier","Futuristic Car",
        "Underwater Kingdom"
    ]

    const styles = ["Realistic","Anime","Cartoon","Fantasy",
        "cyberpunk","sketch","Oil Painting","3D Render"

    ]

    const loadingTexts = ["Alayzing prompt...","Creating composition...","Adding details...",
        "Rendering image","finalizing artwork..."]

    const handleGenerate = async () => {

        if(!isAuthenticated){
            alert("Please login to generate images")
            navigate("/login")
            return
        }
        
        if(!prompt.trim()){
            alert("Please enter a prompt")
            return
        }

        try{
            setLoading(true)

            setprogress(0)

            const interval = setInterval(()=>{
                setprogress((prev) =>{
                    if (prev >= 95) return prev
                    return prev + 5
                })
            },300)

            const data = await generateImage(prompt,style)

            setImageUrl(data.imageUrl)
            clearInterval(interval)
            setprogress(100)
            
        }catch (error){
            alert(error.response?.data?.message || "image generation failed")
        }finally{
            setLoading(false)
        }
    }

    const downloadImage = async () =>{

        if (!imageUrl) return
        const response = await fetch(imageUrl)

        const blob = await response.blob()

        const url=window.URL.createObjectURL(blob)

        const link= document.createElement("a")

        link.href = url
        
        link.download = "venom-ai-image.jpg"

        document.body.appendChild(link)

        link.click()

        link.remove()
    }

    return(
        <>
        <Navbar/>

        <section data-aos="fade-up" className="text-center py-20 px-6">

            <h1 className="animate-typing-venom text-center w-0 pr-1 text-4xl md:text-5xl text-white font-bold trackin-normal border-r-4 border-r-white pr-2 py-2 leadong-normal mb-4">Venom AI Image Studio</h1> 
            <p className="max-w-2xl mx-auto text-lg opacity-80">Generate stunning AI images from simple text prompt.</p>
        </section>

        <section data-aos="zoom-in" className="max-w-5xl mx-auto px-6">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
            <textarea rows="6" value={prompt} onChange={(e)=> setPrompt(e.target.value)}
                placeholder="Describe your image..." className="w-full p-5 rounded-2zl bg-white/5 border border-purple-500/20 resize-none outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"/>
                <select value={style} onChange={(e) => setStyle(e.target.value)}
                    className="mt-4 w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-600">
                        {
                            styles.map((item)=>{
                                return(
                                <option key={item} value={item}>
                                    {item}
                                </option>
                                )
                                })
                        }

                </select>

                 <p className="text-right text-sm opacity-70 mt-2">{prompt.length}/500</p>

                <button onClick={handleGenerate} disabled={!prompt.trim()|| loading} className={`mt-3 w-full py-3 rounded-xl text-white ${!prompt.trim()?"bg-gray-500 cursor-not-allowed":"bg-purple-600 hover:bg-purple-700"}`}>
                    {
                     loading ? (        
                    <>
                    <div className="mt-5 w-full py-3 rounded-xl bg-purple-600 text-white font-semibold flex items-center justify-center gap-2 " className=" w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin "></div>
                    Generating Ai Image...
                    </>
                     ) :(
                        "Generate Image"
                     )
                 
                    }
                </button>
            </div>
        </section>

        <section data-aos="fade-up" className="max-w-6xl mx-auto px-6 mt-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Prompt Templates</h2>

            <div className="grid md:grid-cols-4 gap-4">
                {
                    templates.map((item)=>(
                        <button key={item} onClick={()=>setPrompt(item)} className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition">
                         {item}
                        </button>
                    ))
                }
            </div>
        </section>

        {
            loading &&(

                <div className="mt-10">
                    <div className="w-full h-[500px] rounded-2xl animate-pulse bg-white/10">
                <div className="mt-6">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full transition-all duration-300" style={{width:`${progress}%`}}></div>
                    </div>
                    <p className="mt-3 text-center">{progress}%</p>
                    <p className="text-center mt-2 opacity-80">
                        {
                            loadingTexts[
                                Math.min(
                                    Math.floor(progress/20),loadingTexts.length - 1
                                )
                            ]
                        }
                    </p>
                </div>
                </div>
                </div>
            )
        }

        {
            imageUrl && (
                <section data-aos="zoom-in" className="max-w-5xl mx-auto px-6 mt-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Generate Image</h2>
                    <div className="flex justify-center"><img src={imageUrl} alt="Generated" className="rounded-2xl shadow-2xl max-h-[600px]"/>
                    </div>
                    <div className="text-center mt-6"><button onClick={downloadImage} className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition text-white">Download Image</button></div>
                </section>
            ) 
        }

        <section className="max-w-6xl mx-auto px-6 mt-24">
            <h2 data-aos="fade-up" className="text-4xl font-bold text-center mb-10">Features</h2>
             <div className="grid md:grid-cols-3 gap-8">
                <div data-aos="fade-up" className="p-6 rounded-xl bg-white/10">Multiple AI style</div>
                <div data-aos="fade-up" data-aos-delay="100" className="p-6 rounded-xl bg-white/10">Fast Generation</div>
                <div data-aos="fade-up" data-aos-delay="200" className="p-6 rounded-xl bg-white/10">Download Images</div>
             </div>
        </section>

        <Footer/>
        </>
    )


}