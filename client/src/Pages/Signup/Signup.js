import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import { set_teacher } from '../../Redux/Slices/TeacherSlice';
import { Spinner } from 'react-bootstrap'; 
import 'bootstrap';
import 'react-bootstrap';
import '../Signup/Signup.css';
import { selectloggedstatus } from '../../Redux/Slices/AuthSlice';
import Loader from '../../Components/Loader/Loader';

const Signup = () => {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
const logstatus = useSelector(selectloggedstatus)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if(logstatus){
    navigate("/")
  }
  const initialvalue = {
    name: '',
    email: '',
    password: '',
    subject: '',
  };
  const [Formdata, setFormdata] = useState(initialvalue);
  const [loading, setLoading] = useState(false); 

  const { name, email, password, subject } = Formdata;
  const handleonchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormdata({ ...Formdata, [name]: value });
  };
  const handleonsubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axios.post(`${backend_url}signup`, Formdata, { withCredentials: true });

      dispatch(set_teacher(res.data));
      toast.success('Registered successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar/>
    {loading?<Loader/>:null}
    <div className='container mt-5'>
      <div className='card p-4'>
        <h2 className='text-center mb-4'>Sign-Up</h2>
      <form  onSubmit={handleonsubmit}>
        <div className='mb-3'>
        <label className='form-label'>Name:</label>
        <input className='form-control' type='text' name='name' value={name} placeholder='Enter Name' onChange={handleonchange} />
        </div>
        <div className='mb-3'>
        <label className='form-label'>Email:</label>
        <input className='form-control' type='email' name='email' value={email} placeholder='Enter Email' onChange={handleonchange}/>
        </div>
        <div className='mb-3'>
        <label className='form-label'>Password:</label>
        <input className='form-control' type='Password' name='password' value={password} placeholder='Enter Password' onChange={handleonchange}/>
        </div>
        <div className='mb-3'>
        <label className='form-label'>Subject:</label>
        <input className='form-control' type='text' name='subject' value={subject} placeholder='Enter Subject eg(English,maths etc)' onChange={handleonchange}/>
        </div>
        <div>
          <button type='submit' className='btn-btn-primary'>Sign-up</button>
        </div>
      </form>
      </div>
    </div>
    
    </>
  )
}

export default Signup