import React from "react";
import AttendanceTracking from "./AttendanceTracking";
import "./AttendanceDashboard.css"
import DefaulterList from "./DefaulterList";

const AttendanceDashboard = ({courseId}) =>{
    return(<div>
        <div className="barChart">
            <p>Bar Chart here</p>
        </div>
        <div className="attendanceDetails">
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

