import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './StudentAttendanceTracker.css';
import axios from 'axios';



const StudentAttendanceTracker = ({user_id}) => {

    
    const [subjects, setSubjects] = useState([{
        name: "Mathematics",
        attendedLectures: 30,
        conductedLectures: 35,
        totalLectures: 40,
    },
    {
        name: "Physics",
        attendedLectures: 20,
        conductedLectures: 25,
        totalLectures: 30,
    },
    {
        name: "Chemistry",
        attendedLectures: 25,
        conductedLectures: 35,
        totalLectures: 40,
    },
    {
        name: "Biology",
        attendedLectures: 35,
        conductedLectures: 35,
        totalLectures: 50,
    },
    {
        name: "Computer Science",
        attendedLectures: 15,
        totalLectures: 20,
    }
]);

useEffect(() => {
    // setInfo(JSON.parse(localStorage.getItem('userInfo')));
    // setId(info.id);
    // console.log(info)
    // console.log(studentId);
    // Ensure that studentId is defined before making the request
    if (user_id) {
        // Fetch data from Flask API
        axios.post('http://localhost:5000/get_user_attendance', { user_id: user_id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the attendance!', error);
            });
    } else {
        console.error('Student ID is not provided');
    }
}, [user_id]); 

    // Calculate the number of lectures that can be missed while maintaining 75% attendance
    const calculateCanMissLectures = (attended, conducted, total) => {
        return Math.floor(0.25*total-conducted+attended);
    };

    return (
        <div className="attendance-tracker11" >
            <h1>Attendance Tracker</h1>
            <div className="card-container11" >
                {subjects.map((subject, index) => {
                    const percentage = ((subject.attendedLectures / subject.conductedLectures) * 100).toFixed(2);
                    const isBelowThreshold = percentage < 75;
                    const canMissLectures = calculateCanMissLectures(subject.attendedLectures,subject.conductedLectures, subject.totalLectures);

                    const data = {
                        datasets: [{
                            data: [subject.attendedLectures, subject.conductedLectures-subject.attendedLectures],
                            backgroundColor: [isBelowThreshold ? '#e74c3c' : '#27ae60', '#dcdcdc'],
                            borderWidth: 1,
                        }]
                    };

                    const options = {
                        cutout: '70%',
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context) => `${context.raw} lectures`
                                }
                            },
                            legend: { display: false }
                        }
                    };

                    return (
                        <div className="card11" key={index}>
                            <div className="card-content11">
                                <h2>{subject.name}</h2>
                                <p>Conducted Lectures: {subject.conductedLectures}</p>
                                <p>Lectures Attended: {subject.attendedLectures}</p>
                                <p className={`percentage ${isBelowThreshold ? 'red' : 'green'}`}>
                                    {percentage}% Attendance
                                </p>
                                <p className="can-miss11">Can miss next {canMissLectures} lectures</p>
                            </div>
                            <div style={{width:"200px",height:"200px",marginTop:"30px",marginLeft:"100px"}}>
                            <Doughnut data={data} options={options} />
                            </div>
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentAttendanceTracker;
