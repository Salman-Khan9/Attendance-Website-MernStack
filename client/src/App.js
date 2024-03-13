import { BrowserRouter as Router , Routes,Route } from 'react-router-dom';
import "bootstrap"
import "react-bootstrap"
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import CreateClass from './Pages/CreateClass/CreateClass';
import AttendanceHistory from './Pages/AttendanceHistory/AttendanceHistory';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectloggedstatus } from './Redux/Slices/AuthSlice';

function App() {
  const logged = useSelector(selectloggedstatus)
  return (
    
    <Router>
      <ToastContainer/>
      
        {logged?
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Attendance/History' element={<AttendanceHistory/>}/>
        <Route path='/add/students/in/class' element={<CreateClass/>}/>
        </Routes>
        :
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
        }
       
        
      
    </Router>
  );
}

export default App;
