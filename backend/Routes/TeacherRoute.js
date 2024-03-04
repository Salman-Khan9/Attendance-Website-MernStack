const express = require("express")
const Teacher = require("../Models/TeacherModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const routes = express.Router()
const generatetoken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY, {expiresIn:"1d"})
}
routes.post("/signup",async(req,res)=>{
    try { 
        const saltrounds = 10
        const {email,password,name,subject} = req.body
        const emailexist = await Teacher.findOne({email})
        if(emailexist){
            res.status(400).json("Email already exist")
        }
        const bcryptedpass = await bcrypt.hash(password,saltrounds)
        const user = await Teacher.create({name:name,email:email,password:bcryptedpass,subject:subject})
        const token =  generatetoken(user._id)
        res.cookie("token",token,{
            path:"/",
            httpOnly : true,
            expires : new Date(Date.now()+86400*1000),
            sameSite : "none",
            secure : true,
        })
        
        res.status(200).json({name,subject})
    } catch (error) {
        res.status(400).json(error)
    }
})
routes.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await Teacher.findOne({email})
        if(!email){
            res.status(400).json("Teacher not found")
        }
        const verify = await bcrypt.compare(password,user.password)
        if(!verify){
            res.status(400).json("Wrong Password")
        }
        const token = generatetoken(user._id)
        res.cookie("token",token,{
            path:"/",
            httpOnly : true,
            expires : new Date(Date.now()+86400*1000),
            sameSite : "none",
            secure : true,

        })
        const {name,subject} = user
        res.status(200).json({name,subject})
    } catch (error) {
        res.status(400).json(error)
    }
})
routes.get("/logout",async(req,res)=>{
    try {

        res.clearCookie("token",{
            path:"/",
            httpOnly : true,
            
            sameSite : "none",
            secure : true,
        })
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        res.status(200).json("Logged out Successfully")
    } catch (error) {
        res.status(400).json("Logout failed")
    }
})
routes.get("/logged", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json(false);
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        if (verify) {
            return res.status(200).json(true);
        } else {
            return res.status(400).json(false);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});
module.exports = routes