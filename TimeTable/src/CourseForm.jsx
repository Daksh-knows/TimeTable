import React,{useState} from "react";
import HoverButton from "./HoverButton";
import "./CourseForm.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function CourseForm({user_id,onAddCourse,onClose}){
     
    
      

      const [courseId, setCourseId] = useState('');
      const [courseDetails, setCourseDetails] = useState({
          name: '',
          date: '',
      });

      const handleInputChange = (e) => {
        setCourseId(e.target.value);
    };

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
        
        
    //     onClose()
    //     // Here you can handle form submission, such as sending the data to a server
    //   };

      const fetchCourseDetails = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.get(`http://localhost:5000/course/${courseId}`);
            setCourseDetails({
                name: response.data.name,
                date: response.data.date,
                
            });
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const EnrollStudent = async (e) => {
        try {
            e.preventDefault();
            if (user_id && courseId) {
                
                axios.post('http://localhost:5000/enroll_student', { user_id: user_id, course_id: courseId }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log('Student enrolled successfully')
                    })
                    .catch(error => {
                        console.error('There was an error enrolling student!', error);
                    });
            } else {
                console.error('Student ID or Course ID is not provided');
            }
            onClose()
        } catch (error) {
            console.error('Error enrolling student', error);
        }
    };


    

    return(
        <div className="CourseFormContainer">
            <p></p>
            <form className="CourseForm">
            <div className="FieldHolder">
                <label htmlFor="CourseId" className="CourseFormLabel">Enter Course Id</label>
                <input 
                 type="text" 
                 id="CourseId"
                 name="CourseId"
                 value={courseId}
                 onChange={handleInputChange}
                 className="CourseFormInput"
                />
            </div>
            <div style={{marginTop:"10px", height:"30px"}} onClick={fetchCourseDetails}>
                <HoverButton  
                text="Fetch Details"              
                />
            </div>
            <div className="FieldHolder">
                <label htmlFor="CourseName" className="CourseFormLabel">Course Name</label>
                <input 
                 type="text" 
                 id="CourseName"
                 name="CourseName"
                 value={courseDetails.name}
                 
                 className="CourseFormInput"
                readOnly
                />
            </div>
            <div className="FieldHolder">
                <label htmlFor="CourseDate" className="CourseFormLabel">Duration</label>
                <input 
                 type="text" 
                 id="CourseDate"
                 name="CourseDate"
                 value={courseDetails.date}
                 
                 className="CourseFormInput"
                 readOnly
                />
            </div>

            
            
            <div style={{marginTop:"10px"}} onClick={EnrollStudent}>
                <HoverButton  
                type="Submit"
                text="Enroll Now"              
                />
            </div>
            </form>
        </div>
    );
}

export default CourseForm;