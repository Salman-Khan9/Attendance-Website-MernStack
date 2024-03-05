import React, { useState } from 'react'
import Authentication from '../../Middleware/Authentication'
import axios from 'axios'

const TakeAttendance = ({classname,handlefilter,filteredstudents}) => {
    Authentication("/login")
    const [Attendancedata, setAttendancedata] = useState([])
    const handleonpresent=(data)=>{
        const payload = {
            name : data.name,
            classname : data.classname,
            rollno:data.rollno,
            attedance:"Present"
        }
setAttendancedata(prevData => [...prevData, payload])
    }
     const handleonabsent=(data)=>{
        const payload = {
            name : data.name,
            classname : data.classname,
            rollno:data.rollno,
            attedance:"Absent"
        }
setAttendancedata(prevData => [...prevData, payload])
    }
    console.log(Attendancedata)
    const handleonsubmit =async(e)=>{
e.preventDefault()
try {
    const res = await axios.post("http://localhost:4000/students/attendance",Attendancedata,{withCredentials:true})
    console.log(res.data)
} catch (error) {
    
}

    }

  return (
    
    <div>
        {classname.map((classes,index)=>(
            <div>
            <button key={index} onClick={()=>handlefilter(classes)}>Class:{classes}</button>
</div>
      ))}
      <div>{filteredstudents.map((data,index)=>(
        <ul key={index}>
            <li>Student Name:{data.name}</li>
            <li>Class:{data.classname}</li>
            <li>Roll-No:{data.rollno}</li>
            <li><button onClick={()=>handleonpresent(data)}>Present</button></li>
            <li><button onClick={()=>handleonabsent(data)}>Absent</button></li>
        </ul>
      ))} <button onClick={handleonsubmit}>Submit-Attendance</button></div>
    </div>
  )
}

export default TakeAttendance