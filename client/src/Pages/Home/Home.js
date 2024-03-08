import React from 'react'
import Authentication from '../../Middleware/Authentication'
import TakeAttendance from '../../Components/TakeAttendance/TakeAttendance'
import Navbar from '../../Components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import { selectteacher } from '../../Redux/Slices/TeacherSlice'
import "../Home/Home.css"
const Home = () => {
    Authentication("/login")
    const teacher = useSelector(selectteacher)
    console.log(teacher)
  return (
    <div>
      <Navbar></Navbar>
      <div className='teacher'><span className='Teacher-name'>Teacher: {teacher.name}</span><span className='subject-name'>Subject: {teacher.subject}</span></div>
<TakeAttendance/>
 </div>
  )
}

export default Home