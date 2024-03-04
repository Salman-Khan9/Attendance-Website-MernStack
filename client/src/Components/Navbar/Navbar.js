import React from 'react'
import "bootstrap"
import "react-bootstrap"
import { Link} from "react-router-dom"
const Navbar = () => {
    
  return (
   <> <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Attendify</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
        
        <li className="nav-item">
          <Link className="btn btn-primary nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn btn-primary" to="/signup">Signup</Link>
        </li>
        
       
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar