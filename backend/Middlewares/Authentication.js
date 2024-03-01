const jwt = require("jsonwebtoken")
const Teacher = require("../Models/TeacherModel")

const auth =async (req,res,next)=>{
try {
    const token = req.cookies.token
    
    if(!token){
        res.status(400).json("Not Authorize Please Login")
    }
    const verify = jwt.verify(token,process.env.SECRET_KEY)
    
    if(!verify){
        res.status(400).json("Not Authorize Please Login")
    }
        const userinfo =  await Teacher.findById(verify.id).select("-password")
        
        req.user = userinfo
        next()
    
} catch (error) {
    res.status(400).json("Authentication Failed")
}
}
module.exports = auth