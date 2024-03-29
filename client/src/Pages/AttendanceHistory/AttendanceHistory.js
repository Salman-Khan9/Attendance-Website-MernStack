import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Authentication from '../../Middleware/Authentication';
import Navbar from '../../Components/Navbar/Navbar';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import "../AttendanceHistory/AttendanceHistory.css";
import { useSelector } from 'react-redux';
import { selectteacher } from '../../Redux/Slices/TeacherSlice';
import { Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap
import 'bootstrap';
import Loader from '../../Components/Loader/Loader';

const AttendanceHistory = () => {
    Authentication("/login");
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const teacher = useSelector(selectteacher);

    const [Attendancedata, setAttendancedata] = useState([]);
    const [classname, setclassname] = useState([]);
    const [filteredattendance, setfilteredattendance] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [loading, setLoading] = useState(true); // State for loader

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(`${backend_url}Attendance/History`, { withCredentials: true });
                const { attendancehistory, classname } = res.data;
                setAttendancedata(attendancehistory);
                setclassname(classname);
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.log(error);
                setLoading(false); // Set loading to false in case of error
            }
        };
        fetchdata();
    }, [backend_url]);

    const handleonclick = (classes) => {
        const data = Attendancedata
            .filter((attendance) => {
                const studentsAttendance = attendance.StudentsAttendance;
                return studentsAttendance.some((student) => student.classname === classes);
            })
            .map((attendance) => ({
                StudentsAttendance: attendance.StudentsAttendance,
                date: attendance.date
            }));
            
        setfilteredattendance(data);
    }

    const handleDateChange = date => {
        setSelectedDate(date);
        filterAttendanceByDate(date);
        setShowCalendar(false);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    const filterAttendanceByDate = (selectedDate) => {
        const formattedDate = formatDate(selectedDate);
        const filteredData = Attendancedata.filter(attendance => attendance.date === formattedDate);
        setfilteredattendance(filteredData);
    };
    
      
    
  return (
    <>
    {loading?<Loader/>:null}
    <div>
        <Navbar></Navbar>
<div className='history-teacher'><span className='history-Teacher-name'>Teacher: {teacher.name}</span><span className='history-subject-name'>Subject: {teacher.subject}</span>
</div>
        <div className='history-class-buttons'>
  {classname.length>0? <span className='fw-bold fs-3'>Select class:</span> :<span className='fw-bold fs-3'>History not available</span>}
            
        {classname.map((classes,index)=>(
            <button className='history-class-button' onClick={()=>handleonclick(classes)}>Class:{classes}</button>
        ))}
        </div>
        
        </div>
       {classname.length>0?<div className='calendar-container'>
          <button className='calendar-button' onClick={() => setShowCalendar(!showCalendar)}>Search through calendar</button>
          {showCalendar && (
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className='custom-calendar'
            />
          )}
        </div>:null} 
        <div>
    {filteredattendance.map((data, index) => (
        <div >

            <span className='date-div'><div className='date'>Date: {data.date}</div></span>
            <div className='history-attendance-container'>
            <div className='history-students-list'>
            <table>
                <thead>
                    <tr>
                        <th className='history-thead-row'>Name</th>
                        <th className='history-thead-row'>Class</th>
                        <th className='history-thead-row'>Roll-no</th>
                        <th className='history-thead-row'>Appearance</th>
                    </tr>
                </thead>
                <tbody>
                {data.StudentsAttendance.map((subdata, index) => (
                  <>  <tr key={index}></tr>
                    <td className='history-table-row'>{subdata.name}</td>
                    <td className='history-table-row' >{subdata.classname}</td>
                    <td className='history-table-row' >{subdata.rollno}</td>
                    <td className='history-table-row' >{subdata.attendance==="Present"?<p className='bg-success rounded p-2 fw-bold'>Present</p>:<p className='bg-danger rounded p-2 fw-bold'>Absent</p>}</td>
                    </>
                ))}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    ))}
</div>
        </>
  )
}

export default AttendanceHistory