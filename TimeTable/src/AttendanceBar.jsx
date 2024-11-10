import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AttendanceBarChart from "./AttendanceBarChart";




const AttendanceBar = ({course_id}) => {
    const [loading,setLoading] = useState(true) 
    const [bar,setBar] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch('http://localhost:5000/find_attendance_course', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ course_id: course_id }),
                });

                const data = await response.json();

                if (response.ok) {
                    setBar(data.attendance || []);
                    console.log(data.attendance); // Logging data.attendance directly for clarity
                } else {
                    setError(data.message || 'Error fetching attendance for course');
                }
            } catch (err) {
                setError('Error fetching attendance data');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, [course_id]);

    if (loading) return <div>Loading...</div>;
    return(
        <div>
            <AttendanceBarChart attendanceData={bar} />
        </div>
    );
}

export default AttendanceBar;