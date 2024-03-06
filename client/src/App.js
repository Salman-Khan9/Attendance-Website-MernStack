import { BrowserRouter as Router , Routes,Route } from 'react-router-dom';
import "bootstrap"
import "react-bootstrap"
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import CreateClass from './Pages/CreateClass/CreateClass';
import AttendanceHistory from './Pages/AttendanceHistory/AttendanceHistory';

function App() {
  return (
    
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/Attendance/History' element={<AttendanceHistory/>}/>
        <Route path='/add/students/in/class' element={<CreateClass/>}/>
      </Routes>
    </Router>
  );
}

export default App;
