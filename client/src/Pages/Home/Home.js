import React, { useEffect, useState } from 'react'
import Authentication from '../../Middleware/Authentication'
import TakeAttendance from '../../Components/TakeAttendance/TakeAttendance'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
const Home = () => {
  const [studentdataarray, setstudentdata] = useState([])
  const [classname, setclassname] = useState([])
  const [filteredstudents, setfilteredstudents] = useState([])
  useEffect(() => {
    
    const fetchdata = async()=>{
try {
  const data = await axios.get("http://localhost:4000/Allstudents",{withCredentials:true})
  const { studentdata, uniqueclassArray } = data.data;
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
  }
  
console.log(filteredstudents)

    Authentication("/login")
  return (
    <div>
      <Navbar></Navbar>
<TakeAttendance handlefilter={handlefilter} filteredstudents = {filteredstudents} classname = {classname}  studentdataarray={studentdataarray}/>
 </div>
  )
}

export default Home