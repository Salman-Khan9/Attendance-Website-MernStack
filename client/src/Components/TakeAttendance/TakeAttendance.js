import React, { useEffect, useState } from 'react';
import Authentication from '../../Middleware/Authentication';
import axios from 'axios';
import '../TakeAttendance/TakeAttendance.css';
import { MdOutlinePersonAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TakeAttendance = () => {
  Authentication('/login');
  const backend_url = process.env.REACT_APP_BACKEND_URL

  const [studentdataarray, setstudentdata] = useState([]);
  const [classname, setclassname] = useState([]);
  const [filteredstudents, setfilteredstudents] = useState([]);
  const [Attendancedata, setAttendancedata] = useState([]);
  const [submitbutton, setsubmitbutton] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await axios.get(`${backend_url}Allstudents`, {
          withCredentials: true,
        });

        const { studentdata, uniqueclassArray } = data.data;
        if (studentdata.length > 0) {
          setcreateclassbutton(true);
        }
        setstudentdata(studentdata);
        setclassname(uniqueclassArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [backend_url]);

  const handlefilter = (classes) => {
    const studentdata = studentdataarray
      .filter((data) => data.classname === classes)
      .map((students, index) => students);
    setAttendancedata([]);
    setfilteredstudents(studentdata);
    setsubmitbutton(true);
  };

  const handleAttendance = (data, attendance) => {
    const updatedData = filteredstudents.map((student) => {
      if (student.rollno === data.rollno) {
        return {
          ...student,
          attendance: attendance,
        };
      }
      return student;
    });
    setfilteredstudents(updatedData);

    const payload = {
      name: data.name,
      classname: data.classname,
      rollno: data.rollno,
      attendance: attendance,
    };
    setAttendancedata((prevData) => [...prevData, payload]);
  };

  const handleonsubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(
        `${backend_url}students/attendance`,
        Attendancedata,
        { withCredentials: true }
      );
      setAttendancedata([]);
      setfilteredstudents([])
      setsubmitbutton(false)
      toast.success("Attendance Submitted")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {studentdataarray.length>0 ? (
        <div className='class-buttons'>
          <span className='fw-bold fs-3'>Select class:</span>
          {classname.map((classes, index) => (
            <button
              className='class-button'
              key={index}
              onClick={() => handlefilter(classes)}
            >
              Class: {classes}
            </button>
          ))}
        </div>
      ) : (
        <div className='create-class-button'>
          <Link className='create-class-link' to='/add/students/in/class'>
            Add Students in Class
            <MdOutlinePersonAdd size={22} className='icon' />
          </Link>
        </div>
      )}
      {filteredstudents.length>0 ? (
        <div className='attendance-container'>
          <div className='students-list'>
            <table>
              <thead>
                <tr>
                  <th className='thead-row'>Name</th>
                  <th className='thead-row'>Class</th>
                  <th className='thead-row'>Roll-No</th>
                  <th className='thead-row'>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredstudents.map((data, index) => (
                  <tr key={index}>
                    <td className='table-row'>{data.name}</td>
                    <td className='table-row'>{data.classname}</td>
                    <td className='table-row'>{data.rollno}</td>
                    <td className='table-row'>
                      {data.attendance ? (
                        <p>{data.attendance==="Present"?<p className='bg-success rounded p-2 fw-bold'>Present</p>:<p className='bg-danger rounded p-2 fw-bold'>Absent</p>}</p>
                      ) : (
                        <>
                          <button
                            className='present-button'
                            onClick={() => handleAttendance(data, 'Present')}
                          >
                            Present
                          </button>
                          <button
                            className='absent-button'
                            onClick={() => handleAttendance(data, 'Absent')}
                          >
                            Absent
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {submitbutton ? (
        <div className='submit'>
          <button className='submit-button' onClick={handleonsubmit}>
            Submit Attendance
          </button>
        </div>
      ) : null}
    </>
  );
};

export default TakeAttendance;
