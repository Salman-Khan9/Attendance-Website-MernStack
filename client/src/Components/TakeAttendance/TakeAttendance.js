import React, { useState } from 'react'
import Authentication from '../../Middleware/Authentication'
import axios from 'axios'
import "../TakeAttendance/TakeAttendance.css"
const TakeAttendance = ({classname,handlefilter,filteredstudents}) => {
    Authentication("/login")
    const [Attendancedata, setAttendancedata] = useState([])
    const handleonpresent=(data)=>{
        const payload = {
            name : data.name,
            classname : data.classname,
            rollno:data.rollno,
            attendance:"Present"
        }
setAttendancedata(prevData => [...prevData, payload])
    }
     const handleonabsent=(data)=>{
        const payload = {
            name : data.name,
            classname : data.classname,
            rollno:data.rollno,
            attendance:"Absent"
        }
setAttendancedata(prevData => [...prevData, payload])
    }
    console.log(Attendancedata)
    const handleonsubmit =async(e)=>{
e.preventDefault()
try {
    const res = await axios.post("http://localhost:4000/students/attendance",Attendancedata,{withCredentials:true})
    console.log(res.data)
    setAttendancedata([])
} catch (error) {
    
}

    }

  return (
    
    <div className='attendance-container'>
    <div className='class-buttons'>
        {classname.map((classes, index) => (
            <button className='class-button' key={index} onClick={() => handlefilter(classes)}>Class: {classes}</button>
        ))}
    </div>
    <div className='students-list'>
        {filteredstudents.map((data, index) => (
            <ul className='student-details' key={index}>
                <li>Student Name: {data.name}</li>
                <li>Class: {data.classname}</li>
                <li>Roll-No: {data.rollno}</li>
                <li>
                    <button className='attendance-button' onClick={() => handleonpresent(data)}>Present</button>
                </li>
                <li>
                    <button className='attendance-button' onClick={() => handleonabsent(data)}>Absent</button>
                </li>
            </ul>
        ))}
        <button className='submit-button' onClick={handleonsubmit}>Submit Attendance</button>
    </div>
</div>


  )
}

export default TakeAttendance