const jwt = require("jsonwebtoken")
const Teacher = require("../Models/TeacherModel")

const auth =async (req,res,next)=>{
try {
    const token = req.cookies.token
    
    if(!token){
       return res.status(400).json("No token")
    }
    const verify = jwt.verify(token,process.env.SECRET_KEY)
    
    if(!verify){
       return res.status(400).json("Not Authorize Please Login")
    }
        const userinfo =  await Teacher.findById(verify.id).select("-password")
        
        req.user = userinfo
        next()
    
} catch (error) {
    res.status(400).json("Authentication Failed")
}
}
module.exports = auth