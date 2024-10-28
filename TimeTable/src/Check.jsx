import React, { useState, useEffect } from 'react';
import axios from 'axios';


const addCourse = async (courseData) => {
    try {
      const response = await axios.post('http://localhost:5000/course', courseData);
      console.log('Course added:', response.data);
      console.log("hi")
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };
  
  // Example usage
  const courseData = {
    name: 'Computer Architecture',
    start_date: '2023-10-20',
    end_date: '2024-6-20',
    total_lectures: 18,
    lectures_conducted: 4,
    total_credits: 4
  };
  
//   addCourse(courseData);

const Check = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch data from Flask API
        axios.get('http://localhost:5000/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    }, []);

    return (
        <div>
            <h1>Courses</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.name} - {course.start_date} to {course.end_date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Check;
