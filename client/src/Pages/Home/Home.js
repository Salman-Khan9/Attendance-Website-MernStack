import React from 'react'
import Authentication from '../../Middleware/Authentication'
import Sidebar from '../../Components/Sidebar/Sidebar'
const Home = () => {

    Authentication("/login")
  return (
    <div>
<Sidebar></Sidebar> 

 </div>
  )
}

export default Home