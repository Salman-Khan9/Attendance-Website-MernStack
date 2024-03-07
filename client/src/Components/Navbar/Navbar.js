import React from 'react'
import "bootstrap"
import "react-bootstrap"
import { Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectloggedstatus } from '../../Redux/Slices/AuthSlice'
import { IoSchool } from "react-icons/io5";

const Navbar = () => {
  const logged = useSelector(selectloggedstatus)
  const navigate = useNavigate()
  const handlelogout = async()=>{
try {
   await axios.get("http://localhost:4000/logout",{withCredentials:true})
navigate("/login")
} catch (error) {
  console.log(error)
}
  }
    
  return (
   <> {logged?
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-0" >
    <div className="container-fluid" style={{backgroundColor:"rgb(128,128,128)"}}>
      <Link className="navbar-brand fw-bold fs-3" to="/">Attendify <IoSchool />
</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav">
          
          <li className="nav-item">
            <Link className="nav-link btn btn-primary fs-5 text-white" to="/add/students/in/class">Add-Students-in-class</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-primary fs-5 text-white" to="/Attendance/History">Attendance-History</Link>
          </li><li className="nav-item">
            <Link className="nav-link btn btn-danger text-white fs-5" onClick={handlelogout} >Logout</Link>
          </li>
         
        </ul>
      </div>
    </div>
  </nav>
   :
   
   <nav className="navbar navbar-expand-lg navbar-light bg-light p-0" >
  <div className="container-fluid" style={{backgroundColor:"rgb(128,128,128)"}}>
    <Link className="navbar-brand fw-bold fs-5" to="login">Attendify <IoSchool />
</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav">
      <ul className="navbar-nav">
        
        <li className="nav-item">
          <Link className="btn btn-primary nav-link text-white" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn btn-primary text-white" to="/signup">Signup</Link>
        </li>
       
      </ul>
    </div>
  </div>
</nav>}
</>
  )
}

export default Navbar