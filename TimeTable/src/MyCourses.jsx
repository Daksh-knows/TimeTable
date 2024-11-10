import React,{useState,useEffect} from "react";
import Courses from "./Courses";
import "./App.css"
import Overlay from "./Overlay";
import CourseForm from "./CourseForm";
import ttImage from './tt.png'; // Import the image
import NotesCard from "./NotesCard";
import Timetable from "./TimeTableDynamic";
import axios from "axios"
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import StudentAttendanceTracker from "./StudentAttendanceTracker";




function MyCourses() {

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  

//   const [courses, setCourses] = useState([
//     { title: "Machine Learning", date: "2 December - 3 March", lectures: "5/20", color: "#d0c1ff", id: "1256" },
//     { title: "Project Management", date: "2 December - 3 March", lectures: "7/18", color: "#d0ffc1", id: "1246" },
//     { title: "Algorithm Analysis", date: "2 December - 3 March", lectures: "8/20", color: "#c1fff3", id: "1156" },
//     { title: "Cloud Computing", date: "2 December - 3 March", lectures: "5/18", color: "#ffd6c1", id: "1776" }
//   ]);

  const notesData = [
    { subject: 'Machine Learning', notes_up: 50, notes_exp: 100, color: '#d0c1ff' },
    { subject: 'Project Planning', notes_up: 30, notes_exp: 80, color: '#C8F1CA' },
    { subject: 'Algorithm Analysis', notes_up: 70, notes_exp: 100, color: '#C8F1E5' },
    { subject: 'Cloud Computing', notes_up: 70, notes_exp: 100, color: '#FDE3D8' }
  ];

   const [info, setInfo] = useState({});
   const [UserId, setId] = useState([]);
   

//    setId(info.id);

   

//   const getCourses = async (student_id) => {
//     try {
//       const response = await axios.post('http://localhost:5000/student/courses', student_id);
//       console.log('Courses found:', response.data);
//       console.log("hi")
//     } catch (error) {
//       console.error('Error accessing courses:', error);
//     }
//   };
  
//   getCourses(student_id)


  const addCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    
  };

  const removeCourse = (title) => {
    setCourses(courses.filter(course => course.title !== title));
  };

  const updateCourse = (title, updatedInfo) => {
    setCourses(courses.map(course =>
      course.title === title ? { ...course, ...updatedInfo } : course
    ));
  };

  const [courses, setCourses] = useState([]);

  

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('userInfo')));
    setId(info.id);
    console.log(info)
    // console.log(studentId);
    // Ensure that studentId is defined before making the request
    if (UserId) {
        // Fetch data from Flask API
        axios.post('http://localhost:5000/user/courses', { user_id: UserId }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${info.access_token}`
            }
        })
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    } else {
        console.error('Student ID is not provided');
    }
}, [UserId]); 

const navigate = useNavigate();

const handleClick = (course_id) =>{
  
  navigate(`/StudentDashboard/${course_id}`);
};

  return (

    

  



    <div className="App" style={{backgroundColor:`white`}}>

      <header>
        {/* <nav className="navbar">
          <h1 className="logo">ET</h1>
        </nav> */}
        <Navbar  />
      </header>
      
      <main>
        <section className="courses-section" style={{marginTop:"100px"}}>
          <h2>Your Courses</h2>
          <p>December 2023</p>
          <div style={{width:"100%",overflowX:"auto",scrollbarWidth:"none"}}>
       <div>
       
       </div>
        <div className="courses">
      {courses.map((course,index) => (
        <div key = {index} className="course-card" style={{ backgroundColor: course.color }} onClick={() => handleClick(course.id)}>
            <div>
            <h3>{course.title}</h3>
            <h3 style={{marginRight:"0px"}}>ID:{course.id}</h3>
            </div>
          
          <p>{course.date}</p>
          <div className="Line" style={{marginTop: `75px`,height:`0.8px`,width: `100%`,backgroundColor: `#7D7B7B`}}><p></p></div>
          <div style={{display:"flex", gap:`200px`}}>
          <p>Lectures</p>
          <p >{course.lectures}</p>
          </div>
        </div>
      ))}
      
      <div className="AddCourse" onClick={openModal}> 
        <div style={{height:"100%"}}>
        <p style={{marginTop:`50px`,textAlign:"center",marginBottom:"0px",fontSize:`100px`}}>+</p>
        <p style={{textAlign:`center`,marginTop:`0px`,fontSize:`30px`}}>Add Course</p>
        </div>
        
      </div>
      <Overlay isOpen={isModalOpen} onClose={closeModal}>
        < CourseForm user_id={UserId} onAddCourse={addCourse} onClose={closeModal}/>
      </Overlay>
      
      </div>
      {/* <MyCourses addCourse={addCourse} /> */}

      
    </div>
          
        </section>
        <div className="Box" >
           <div style={{marginLeft:"0px", textAlign:"center",width:"50%"}}>
          <h2>Time Table</h2>
        
        {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&showPrint=0&src=ZGFrc2hqYWluNjI0QGdtYWlsLmNvbQ&src=MWU0ZmI0YzVkM2VkYjU4ZmViZDkxNWE2MjVmYTlmMTZhOGVhNjEzMDdlYWE0YzBjODQ4OWMwNTBhMjg1YzczMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTEzMzAxNTkyNTA5NjkzNTMxMzYyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE0NTU3NDU4NzAzNTg5NjI4ODA3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTEzMjYxNTUxNDEzNzEzNjAyNTM1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE0MjkyMDY0MjU1MDY4ODUzNDY3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA2MTQ3MzMwNzE4MjI0NjYwMTY5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE2OTc1MzU5ODkzODU5MDc3Mzc5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTEyMTEwNTIyODY3MzA0NTU5MjUyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTAzNDkwNzIwMDAwNjI3NjA1MjkzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE3NDM1MjAyMDAyNTQ5NzgzMjIzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA0NDQ5NzE0OTE2MzA5MTI4NDYxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTAwODQ0OTkwMzYxMjg1MjA2MDExQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA3ODExMzUyMDMwNjM5NDI0NDg2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%23B39DDB&color=%230047a8&color=%23007b83&color=%230047a8&color=%23202124&color=%237627bb&color=%23174ea6&color=%23174ea6&color=%237627bb&color=%23137333&color=%237627bb&color=%23b80672&color=%237627bb" style={{border: "solid 1px #777", width: "100%" ,height :"100%" ,frameborder:"0" ,scrolling :"no"}}></iframe> */}
          <iframe src="https://calendar.google.com/calendar/embed?src=dakshjain624%40gmail.com&ctz=UTC" style={{width:"80%",height:"30%"}}></iframe>
          
          {/* <Timetable visible={true} /> */}
          
          </div>
          <div >
            <StudentAttendanceTracker user_id={UserId} />
          </div>
        
        
       {/* <div className="NotesBars" style={{marginLeft: `0px`}}>
        <h2 style={{marginLeft: `10px`}}>Notes</h2>
        
      {notesData.map((note, index) => (
        <NotesCard
          key={index}
          subject={note.subject}
          notes_up={note.notes_up}
          notes_exp={note.notes_exp}
          color={note.color}
        />
      ))}
      </div> */}

      </div>

       
     

        
      </main>
      
      

    </div>
  );
}

export default MyCourses;
