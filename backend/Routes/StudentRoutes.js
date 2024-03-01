const express = require("express")
const auth = require("../Middlewares/Authentication")
const Student = require("../Models/StudentModel")
const route = express.Router()
route.post("/Student",auth,async(req,res)=>{
    try {
        const {name,classname,rollno} = req.body
        const id = req.user.id
        const student = await Student.create({teacher:id,name:name,classname:classname,rollno,rollno})
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json("Error in adding student")
    }
})
route.get("/Allstudents",auth,async(req,res)=>{
    try {
        const studentdata = await Student.find()
        const classname= studentdata.map((data)=>data.classname)
        const uniqueclassArray = [...new Set(classname)]
        const payload = {
            studentdata,
            uniqueclassArray
        }
        res.status(200).json(payload)
    } catch (error) {
        res.status(400).json("error in getting students data")
    }
})
route.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const deleteStudent = await Student.findByIdAndDelete(id)
        res.status(200).json(deleteStudent)
    } catch (error) {
        res.status(400).json("error in removing student")
    }
})
module.exports = route