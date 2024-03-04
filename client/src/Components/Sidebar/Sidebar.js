import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import "bootstrap"
import "react-bootstrap"

const Sidebar = () => {
    const navigate = useNavigate()
    const handlelogout =async (e)=>{
        e.preventDefault()
        try {
          await axios.get("http://localhost:4000/logout",{withCredentials:true})
         navigate("/login")
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "260px", height: "100vh" }}>
    <div className="dropdown text-center">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        mdo
    </button>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser2">
        <li>
            <button onClick={handlelogout} className="dropdown-item text-danger">
                <i className="bi bi-box-arrow-right me-2"></i> Sign out
            </button>
        </li>
    </ul>
</div>

    <hr />

    <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <Link to="/" className="nav-link text-black " aria-current="page">
                <svg className="bi me-2" width="16" height="16"></svg>
                Home
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-black">
                <svg className="bi me-2" width="16" height="16"></svg>
                Dashboard
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/orders" className="nav-link text-black">
                <svg className="bi me-2" width="16" height="16"></svg>
                Orders
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/products" className="nav-link text-black">
                <svg className="bi me-2" width="16" height="16"></svg>
                Products
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/customers" className="nav-link text-black">
                <svg className="bi me-2" width="16" height="16"></svg>
                Customers
            </Link>
        </li>
    </ul>
</div>
  )
}

export default Sidebar