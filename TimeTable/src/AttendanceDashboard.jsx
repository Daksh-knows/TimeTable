import React from "react";
import AttendanceTracking from "./AttendanceTracking";
import "./AttendanceDashboard.css"
import DefaulterList from "./DefaulterList";
import { useEffect } from "react";
import AttendanceBar from "./AttendanceBar";


const AttendanceDashboard = ({courseId}) =>{
    
    return(<div>
        <div className="barChart">
            {/* <p>Bar Chart here</p> */}
            <AttendanceBar  course_id={courseId}/>
        </div>
        <div className="attendanceDetails" style={{marginTop:'50px'}}>
            <div className="defaulterList">
                
                <DefaulterList  courseId={courseId}/>
            </div>
            <div className="attendanceForm">
                <AttendanceTracking  course_id={courseId}/>
            </div>
        </div>
        <div className="attendanceReport">

        </div>
    </div>);
};

export default AttendanceDashboard;

