import React from 'react'
import Authentication from '../../Middleware/Authentication'
import TakeAttendance from '../../Components/TakeAttendance/TakeAttendance'
import Navbar from '../../Components/Navbar/Navbar'
const Home = () => {
    Authentication("/login")
  return (
    <div>
      <Navbar></Navbar>
<TakeAttendance/>
 </div>
  )
}

export default Home