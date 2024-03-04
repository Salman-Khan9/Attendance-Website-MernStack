import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import "bootstrap"
import "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { del_teacher, selectteacher } from '../../Redux/Slices/TeacherSlice'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const teacher = useSelector(selectteacher)
    const handlelogout =async (e)=>{
        e.preventDefault()
        try {
          await axios.get("http://localhost:4000/logout",{withCredentials:true})
          dispatch(del_teacher())
         navigate("/login")
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className="d-flex flex-column flex-shrink-0  bg-light" style={{ width: "260px", height: "100vh" }}>
    <div className="dropdown text-center" >
      
    <button className="btn btn-secondary dropdown-toggle" style={{width:"260px"}} type="button" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
   Attendify
    </button>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser2">
        <li>
            <button onClick={handlelogout} className="dropdown-item text-danger">
                <i className="bi bi-box-arrow-right "></i> Sign out
            </button>
        </li>
    </ul>
</div>
<div>Teacher Name: {teacher.name}</div>
        <div>Subject: {teacher.subject}</div>

    <hr />

    <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item-active" >
            <Link to="/" className="nav-link text-black "  aria-current="page">
                <svg className="bi me-2" width="16" height="16"></svg>
                Create Class
            </Link>
        </li>
        
    </ul>
</div>
  )
}

export default Sidebar