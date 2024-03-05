import axios from 'axios'
import React, {  useState } from 'react'
import "../CreateClass/createclass.css"
import Authentication from '../../Middleware/Authentication'
import Navbar from '../../Components/Navbar/Navbar'

const CreateClass = () => {
    Authentication("/login")
    const initialstate = {
        name:"",
        classname:"",
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
    <div className="create-class-container">
    <div className='create-class-form-container'>
    <div className="create-class-form">
        <h2>Create Class</h2>
        <form onSubmit={handelonsubmit}>
            <label>Student Name</label>
            <input type="text" name="name" value={name} placeholder="Enter student name" onChange={handleonchange} />
            <label>Student Class</label>
            <input type="text" name="classname" value={classname} placeholder="Enter student class" onChange={handleonchange} />
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