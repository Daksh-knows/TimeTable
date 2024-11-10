import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import ProgressRing from './ProgressRing';
import Overlay from './Overlay';
import axios from 'axios';
import { useParams } from 'react-router';
import StudentNotesList from './StudentNotesList';

const StudentDashboard = () => {
  const { course_id } = useParams();
  const [lectures, setLectures] = useState([
    { no: 1, title: 'Introduction to Course', date: '2024-09-01', conducted: true },
    { no: 2, title: 'Lecture 2', date: '2024-09-10', conducted: true },
    { no: 3, title: 'Lecture 3', date: '2024-09-15', conducted: true },
    { no: 4, title: 'Lecture 4', date: '2024-09-15', conducted: true },
    { no: 5, title: 'Lecture 5', date: '2024-09-15', conducted: false },
    { no: 6, title: 'Lecture 6', date: '2024-09-15', conducted: false }
  ]);

  const[course_name,setName] = useState('')
  const [selectedOption, setSelectedOption] = useState('viewLectures');

  const totalLectures = lectures.length;
  const conductedLectures = lectures.filter(lecture => lecture.status === 'Conducted').length;
  const notesUploaded = 2; // Example value for uploaded notes
//   const [progress, setProgress] = useState(70);
  const progress = conductedLectures/totalLectures*100;
  const notes_progress = notesUploaded/conductedLectures*100;

  const formatDate = (dateString) => {
    if (!dateString) {
      return "-"; // Handle null or undefined dates
    }
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/lectures/${course_id}`);
        setLectures(response.data.lectures);
        setName(response.data.course_name);
      } catch (error) {
        console.log('Error', error);
      }
    };
  
    fetchLectures();
  }, [course_id]);


  



  return (
    <div className="container1">
      {/* Sidebar */}
      <nav className="sidebar">
        <ul>
            <li className={`${selectedOption === 'viewLectures'?'selected':'notselected'}` } onClick={() => setSelectedOption('viewLectures')}><a href="#"  >View Lectures</a></li>
            <li className={`${selectedOption === 'viewTimetable'?'selected':'notselected'}`} onClick={() => setSelectedOption('viewTimetable')}><a href="#" >View TimeTable</a></li>
            <li className={`${selectedOption === 'viewAttendance'?'selected':'notselected'}`} onClick={() => setSelectedOption('viewAttendance')}><a href="#" >View Attendance</a></li>
            <li className={`${selectedOption === 'viewNotes'?'selected':'notselected'}`} onClick={() => setSelectedOption('viewNotes')}><a href="#" >View Notes</a></li>
            <div style={{marginTop:"500px"}}>
          <a style={{marginLeft:"65px",fontSize:"18px",color:"white",textDecoration:"none", marginTop:"30px"}} href='/MyCourses'>Back to Courses</a>
          </div>
        </ul>
     </nav>

      {/* Main Content */}
      <div className="main-content">
  <h2>Course: {course_name}</h2>
  {selectedOption === 'viewLectures' && (
    <div style={{ display: "flex" }}>
      <div className="lectures-section">
        <h3>Lectures Conducted</h3>
        <div style={{ overflowY: "auto", maxHeight: "50vh" }}>
          {lectures.map((lecture, index) => (
            <div className="lecture" key={index} style={{ backgroundColor: lecture.status === 'Conducted' ? '#b0e57c' : '#f0f0f0' }}>
              <p>{lecture.no}</p>
              <p>{lecture.title}</p>
              <p>Date: {formatDate(lecture.date)}</p>
              <p>Status: {lecture.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="statistics" style={{ marginTop: "60px", height: "375px" }}>
        <h3>Statistics</h3>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "50px" }}>
            <ProgressRing radius={100} stroke={20} progress={progress} />
            <p>{conductedLectures}/{totalLectures} Lectures Conducted</p>
          </div>
          <div style={{ marginLeft: "70px" }}>
            <ProgressRing radius={100} stroke={20} progress={notes_progress} />
            <p>{notesUploaded}/{conductedLectures} Notes Uploaded</p>
          </div>
        </div>
      </div>
    </div>
  )}

  {selectedOption === 'viewTimetable' && (
    <div>
      <h3>Exam Details</h3>
      <p>Display exam information here...</p>
    </div>
  )}

  {selectedOption === 'viewAttendance' && (
    <div>
      <h3>Attendance</h3>
      <p>Display attendance information here...</p>
    </div>
  )}
   {selectedOption === 'viewNotes' && (
    <div>
      <StudentNotesList  courseId={course_id}/>
    </div>
  )}
</div>

      

    </div>
  );
};

export default StudentDashboard;
