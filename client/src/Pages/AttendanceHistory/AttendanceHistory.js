import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Authentication from '../../Middleware/Authentication'
import Navbar from '../../Components/Navbar/Navbar'

const AttendanceHistory = () => {
    Authentication("/login")
    const [Attendancedata, setAttendancedata] = useState([])
    const [classname, setclassname] = useState([])
    const [filteredattendance, setfilteredattendance] = useState([])
    useEffect(() => {
      const fetchdata = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/Attendance/History",{withCredentials:true})
            const {attendancehistory,classname} = res.data
            setAttendancedata(attendancehistory)
            setclassname(classname)
        } catch (error) {
            console.log(error)
        }
      }
      fetchdata()
    }, [])
    const handleonclick = (classes) => {
        const data = Attendancedata
            .filter((attendance) => {
                const studentsAttendance = attendance.StudentsAttendance;
                return studentsAttendance.some((student) => student.classname === classes);
            })
            .map((attendance) => ({
                StudentsAttendance: attendance.StudentsAttendance,
                date: attendance.date
            }));
            
        setfilteredattendance(data);
    }
    console.log(filteredattendance)
    
    
  return (
    <>
    <div>
        <Navbar></Navbar>
        
        {classname.map((classes,index)=>(
            <button onClick={()=>handleonclick(classes)}>{classes}</button>
        ))}
        </div>
        <div>
    {filteredattendance.map((data, index) => (
        <div >
            <div>date: {data.date}</div>
            <ul>
                {data.StudentsAttendance.map((subdata, index) => (
                  <>  <li key={index}>{subdata.name}</li>
                    <li >{subdata.classname}</li>
                    <li >{subdata.rollno}</li>
                    <li >{subdata.attendance}</li>
                    </>
                ))}
            </ul>
        </div>
    ))}
</div>
        </>
  )
}

export default AttendanceHistory