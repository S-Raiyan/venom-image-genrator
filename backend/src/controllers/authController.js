const pool = require("../config/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) =>{
    try{
        const { name , email , password } = req.body

        if(!name || !email || !password ){
            return res.status(400).json({
                message:"All field are required",
            })
        }

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        )

        if (existingUser.rowCount.length > 0){
            return res.status(400).json({
                message:"user already exists"
            })
        }

        const hashedpassword = await bcrypt.hash(password,10)

        const newUser = await pool.query(`INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email`,[name, email, hashedpassword])

        res.status(201).json({
            message:"user Register Successfully",
            user:newUser.rows[0]
        })

    }catch(error){

        console.log(error)

        res.status(500).json({
            message:"server Error"
        })

    }
}

const login = async (req, res) =>{
    try{
        const {email, password} = req.body

        const userResult = await pool.query("SELECT * FROM users WHERE email=$1",[email])

        if(userResult.rows.length === 0){
            return res.status(400).json({message:"Invaaild Email or Password"})
        }
        const user = userResult.rows[0]

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Invaild Email or Password"})
        }

        const token = jwt.sign(
            {
                id:user.id,
                email:user.email,
            },
            process.env.JWT_SECRET,{
                expiresIn:"7d",
            }
        )

        res.status(200).json({
            message:"login successful",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        })

    }catch(error){
        console.log(error)

        res.status(500).json({
            message:"server Error"
        })
    }
}

module.exports={
    register,
    login
}