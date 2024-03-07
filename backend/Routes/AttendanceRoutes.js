const express = require("express")
const auth = require("../Middlewares/Authentication")
const Attendance = require("../Models/AttendanceModel")
const router = express.Router()
router.post("/students/attendance",auth,async(req,res)=>{

    try {
        const id = req.user.id
        const studentsattendace = await Attendance.create({teacher:id,StudentsAttendance:req.body})
        res.status(200).json(studentsattendace)
    } catch (error) {
        res.status(400).json("Error in uploading attendance")
    }
})
router.get("/Attendance/History",auth,async(req,res)=>{
    try {

        const attendancehistory = await Attendance.find({teacher:req.user.id})
        const classname = []
         attendancehistory.forEach((data)=>{data.StudentsAttendance.forEach((subdata)=>
            {
                if(!classname.includes(subdata.classname))
                
                {classname.push(subdata.classname)}
            
            }
            )
        }
        )
    
        console.log(classname)
        res.status(200).json({attendancehistory,classname})
    } catch (error) {
        res.status(400).json("error while fetching history ")
    }
})
module.exports = router