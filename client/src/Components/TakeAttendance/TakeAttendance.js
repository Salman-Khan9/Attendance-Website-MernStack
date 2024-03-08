import React, { useEffect, useState } from 'react'
import Authentication from '../../Middleware/Authentication'
import axios from 'axios'
import "../TakeAttendance/TakeAttendance.css"
import { MdOutlinePersonAdd } from "react-icons/md";

import { Link } from 'react-router-dom'
const TakeAttendance = () => {
    Authentication("/login")
    const [studentdataarray, setstudentdata] = useState([])
  const [classname, setclassname] = useState([])
  const [filteredstudents, setfilteredstudents] = useState([])
    const [Attendancedata, setAttendancedata] = useState([])
    const [submitbutton, setsubmitbutton] = useState(false)
    const [createclassbutton, setcreateclassbutton] = useState(false)
    useEffect(() => {
    
        const fetchdata = async()=>{
    try {
      const data = await axios.get("http://localhost:4000/Allstudents",{withCredentials:true})
      
      const { studentdata, uniqueclassArray } = data.data;
      if(studentdata.length > 0){
        setcreateclassbutton(true)
       }
      setstudentdata(studentdata)
      setclassname(uniqueclassArray)
    } catch (error) {
    console.log(error)    
    }
    
        }
        fetchdata()
      }, [])
      const handlefilter=(classes)=>{
      const studentdata =  studentdataarray.filter((data)=>data.classname===classes).map((students,index)=> students)
      setfilteredstudents(studentdata)
      setsubmitbutton(true)
      }

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
    <>
   {createclassbutton?<div className='class-buttons'>
   <span className='fw-bold fs-3'>Select class:</span> 
    {classname.map((classes, index) => (
       <button className='class-button' key={index} onClick={() => handlefilter(classes)}>Class: {classes}</button> 
    ))}
    </div>:
   <div className='create-class-button'>
     <Link className='create-class-link' to="/add/students/in/class">Add Students in Class<MdOutlinePersonAdd size={22} className='icon'/>
    </Link> 
   </div>
} 
   {submitbutton?<div className='attendance-container' >
   

   <div className='students-list'>
   <table>

               <thead >
                   <tr >
                       <th className='thead-row'>Name</th>
                       <th className='thead-row'>Class</th>
                       <th className='thead-row'>Roll-No</th>
                       <th className='thead-row'>Attendance</th>
                   </tr>
                   
               </thead>
               <tbody>
   {filteredstudents.map((data, index) => (
       <tr key={index}>
           <td className='table-row'>{data.name}</td>
           <td className='table-row'>{data.classname}</td>
           <td className='table-row'>{data.rollno}</td>
           <td className='table-row'>
               <button className='present-button' onClick={() => handleonpresent(data)}>Present</button>
               <button className='absent-button' onClick={() => handleonabsent(data)}>Absent</button>
           </td>
       </tr>
   ))}
</tbody>

           </table>

          
       

   </div>
   
</div>:null} 
{submitbutton?<div  className='submit'><button className='submit-button' onClick={handleonsubmit}>Submit Attendance</button></div>:null} 

</>

)
}

export default TakeAttendance