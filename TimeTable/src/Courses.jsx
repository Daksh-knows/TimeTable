import React,{ useState} from "react";
import "./App.css"
import Overlay from "./Overlay";
import CourseForm from "./CourseForm";
// import MyCourses from "./MyCourses";
// import { useLocation } from "react-router-dom";
// import plus from "./plus.webp"

function Courses() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [courses, setCourses] = useState([
    { title: "Machine Learning", date: "2 December - 3 March", lectures: "5/20", color: "#d0c1ff" },
    { title: "Project Management", date: "2 December - 3 March", lectures: "7/18", color: "#d0ffc1" },
    { title: "Algorithm Analysis", date: "2 December - 3 March", lectures: "8/20", color: "#c1fff3" },
    { title: "Cloud Computing", date: "2 December - 3 March", lectures: "5/18", color: "#ffd6c1" }
  ]);

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



  



  return (
    <div style={{width:"100%",overflowX:"auto",scrollbarWidth:"none"}}>
       <div>
       
       </div>
        <div className="courses">
      {courses.map((course,index) => (
        <div key = {index} className="course-card" style={{ backgroundColor: course.color }}>
          <h3>{course.title}</h3>
          <p>{course.date}</p>
          <div className="Line" style={{marginTop: `100px`,height:`0.8px`,width: `100%`,backgroundColor: `#7D7B7B`}}><p></p></div>
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
        < CourseForm />
      </Overlay>
      
      </div>
      {/* <MyCourses addCourse={addCourse} /> */}

      
    </div>
  );
}

export default Courses;
