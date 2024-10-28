import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './LoginPage'; 
import Hm from './Hm';
import MyCourses from './MyCourses';
import ImageScroller from './imageScroller';
import Check from './Check';
import SignUp from './SIgnUp';
import Dashboard from './Dashboard';
import MyCoursesTeacher from './MyCoursesTeacher';
import AttendanceTracking from './AttendanceTracking';
import StudentDashboard from './StudentDashboard';
import AttendanceDashboard from './AttendanceDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hm />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/MyCourses",
    element: <MyCourses/>
  },
  {
    path:"/MyCoursesTeach",
    element:<MyCoursesTeacher/>
  },
  {
    path: "/imageScroller",
    element: <ImageScroller/>
  },
  {
    path: "/Attendance",
    element: <AttendanceTracking/>
  },
  {
    path: "/AttendanceDashboard",
    element: <AttendanceDashboard/>
  },
  {
    path: "/check",
    element: <Check/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path:"/Dashboard/:course_id",
    element: <Dashboard/>
  },
  {
    path:"/StudentDashboard/:course_id",
    element: <StudentDashboard/>
  }


]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
