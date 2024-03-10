import axios from 'axios'
import React, {  useState } from 'react'
import "../CreateClass/createclass.css"
import Authentication from '../../Middleware/Authentication'
import Navbar from '../../Components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import { selectteacher } from '../../Redux/Slices/TeacherSlice'

const CreateClass = () => {
    const teacher = useSelector(selectteacher)

    Authentication("/login")
    const initialstate = {
        name:"",
        classname:0,
        rollno:"",
    }
const [formdata, setformdata] = useState(initialstate)
const {name,classname,rollno} = formdata
const handleonchange=(e)=>{
    e.preventDefault()
    const {name,value}=e.target
    setformdata({...formdata ,[name]:value})
}
const handelonsubmit = async(e)=>{
    e.preventDefault()
try {
    const res = await axios.post("http://localhost:4000/Student",formdata,{withCredentials:true})
    setformdata(initialstate)
    console.log(res.data)
} catch (error) {
    console.log(error)
}
}

  return (
<><Navbar></Navbar>
<div className='teacher'><span className='Teacher-name'>Teacher: {teacher.name}</span><span className='subject-name'>Subject: {teacher.subject}</span></div>

    <div className="create-class-container">
    <div className='create-class-form-container'>
    <div className="create-class-form">
        <h2>Add student in class</h2>
        <form onSubmit={handelonsubmit}>
            <label>Student Name</label>
            <input type="text" name="name" value={name} placeholder="Enter student name" onChange={handleonchange} />
            <label>Student Class</label>
            <input type="number" className='class-name' name="classname" value={classname} placeholder="Enter student class" onChange={handleonchange} />
            <label>Student Roll-No</label>
            <input type="text" name="rollno" value={rollno} placeholder="Enter student roll-no" onChange={handleonchange} />
            <button type="submit">Submit</button>
        </form>
    </div>
    </div>
</div>
</>
  )
}

export default CreateClass