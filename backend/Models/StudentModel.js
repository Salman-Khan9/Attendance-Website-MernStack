const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    teacher:{
     type: mongoose.Schema.Types.ObjectId,
     required:true,
     ref:"Teacher"
    },
    name:{
        type:String,
        required : true
    },
    classname:{
        type:Number,
        required:true,
    },
    rollno:{
        type:String,
        required:true
    },
    
})
const Student = mongoose.model("Student",schema)
module.exports = Student