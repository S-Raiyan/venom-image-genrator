import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"

export default function Footer(){
    return(
        <footer data-aos="fade-up" className="mt-20 border-t border-white/20 backdrop-blur-lg bg-white/5">

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-3">
                            Venom AI
                        </h2>
                        <p className="opacity-80">Generate stunning AI images from simple prompts.Fast,creative and powerful</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>Home</li>
                            <li>Profile</li>
                            <li>Login</li>
                            <li>Register</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Connect</h3>
                        <div className="flex gap-4 text-2xl">
                            <FaGithub className="cursor-pointer hover:scale-110 transition"/>
                            <FaLinkedin className="cursor-pointer hover:scale-110 transition"/>
                            <FaInstagram className="cursor-pointer hover:scale-110 transition"/>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center border-t border-white/10 pt-5 opacity-70">© 2026 Venom AI. All rights reserved.</div>
            </div>

        </footer>
    )
}