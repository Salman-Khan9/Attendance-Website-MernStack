const mongoose = require("mongoose")
const moment = require("moment")
const schema = new mongoose.Schema({
    teacher:{
     type: mongoose.Schema.Types.ObjectId,
     required:true,
     ref:"Teacher"
    },
    date:{ 
        type:String,
        default:moment().format("MM/DD/yyy"),
    },
    
    StudentsAttendance:{
        type:JSON,
        required:true,
    }
    
})
const Attendance = mongoose.model("Attendance",schema)
module.exports = Attendance