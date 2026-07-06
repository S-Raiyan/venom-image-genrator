const express = require("express")
const router = express.Router()

router.get("/test",(req, res)=>{
    res.json({message:"Image route working"})
})

const { generateImage } = require("../controllers/imageController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/generate",authMiddleware,generateImage)

module.exports = router