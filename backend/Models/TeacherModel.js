const mongoose = require("mongoose")
const moment = require("moment")
const schema = new mongoose.Schema({
   name :{
    type:String,
    required:true,
   },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },


})
const Teacher = mongoose.model("Teacher",schema)
module.exports = Teacher