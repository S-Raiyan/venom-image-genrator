require("dotenv").config({path:"./.env"})

const express = require("express")
const cors = require("cors")
const authRoutes = require ("./routes/authRoutes")
const userRouters = require("./routes/userRoutes")
const imageRoutes = require("./routes/imageRoutes")

const app = express()
const pool = require("./config/db")

pool.connect()
.then(()=>{console.log("postgreSQL connected")})
.catch((err)=>{console.log("Database Error:",err.message)})

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/user",userRouters)
app.use("/api/image",imageRoutes)

app.get("/",(req,res)=>{
    res.send("Venom AI Backend Running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`server running on port ${PORT}`)
})
