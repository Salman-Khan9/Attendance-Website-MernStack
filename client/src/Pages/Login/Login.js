import axios from 'axios'
import React, { useState } from 'react'
import "../Login/login.css"
import Navbar from '../../Components/Navbar/Navbar'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { set_teacher } from '../../Redux/Slices/TeacherSlice'
import { set_logstatus } from '../../Redux/Slices/AuthSlice'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialvalue = {
        email:"",
        password:"",
    }
    const [Formdata, setFormdata] = useState(initialvalue)
    const {email,password} = Formdata
    const handleonchange = (e)=>{
        e.preventDefault()
        const {name ,value}= e.target
        setFormdata({...Formdata,[name]:value})
    }

    const handleonsubmit =async(e)=>{
        e.preventDefault()
        try {
           const res =  await axios.post("http://localhost:4000/login",Formdata,{withCredentials:true})
           console.log(res.data)
           dispatch(set_logstatus(true))
             dispatch(set_teacher(res.data))
             navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <Navbar/>
    <div className='container mt-5'>
    <div className='card p-4'>
        <h2 className='text-center mb-4'>Login</h2>
        <form onSubmit={handleonsubmit}>
            <label className='form-label'>Email</label>
            <input className='form-control' type='email' name='email' value={email} placeholder='Enter your Email' onChange={handleonchange}/>
            <label className='form-label'>Password</label>
            <input className='form-control' type='password' name='password' value={password} placeholder='Enter your Password' onChange={handleonchange}/>
        <div>
            <button type='submit' className='btn-info'>Login</button>
        </div>
        </form>
    </div>
    </div>
    </>
  )
}

export default Login