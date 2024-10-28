import React from "react"
import LeftScroll from "./LeftScroll";
import TiltedRectangle from "./TiltedRectangle";
import TextImageBox from "./TextImageBox";
import TextImageBox2 from "./TextImageBox2";
import Navbar from "./Navbar";
import "./Hm.css"
import { Routes, Route, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from "./LoginPage"
import TestimonialCard from "./TestimonialCard";
import MyCourses from "./MyCourses";
import CourseForm from "./CourseForm";
import ImageScroller from "./imageScroller";
import SignUp from "./SIgnUp";
import Logo from "./logo2.png"


function Hm(){

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('userInfo');
    if (token) {  
            setIsLoggedIn(true);  
    }
    else {
        // If no token exists, set login status to false
        setIsLoggedIn(false);
    }
}, []);
    return(
        <div>
            
                {/* <Link to="./MyCourses">My Courses</Link> */}
                <Navbar  />
            

            <div style={{marginTop:`10%`}}>
                <div className="Homeheading" >
                    <img src={Logo} alt="Logo Here" style={{maxHeight:'400px',}}/>
                    {/* <h1 style={{fontSize:`50px`}}>Welcome to our Time Table Management System</h1> */}
                    {/* <p style={{fontSize:`20px`}}>Efficiently manage your classes, track attendance, and stay organized with our user-friendly platform.</p> */}
                </div>
                {!isLoggedIn && (
                    <div className="ButtonHolder">
                    <Link to="/signup" className="BlackHoverbtn">Sign Up</Link>
                    <Link to="/login" className="BlackHoverbtn" >Login</Link>
            </div>
                )}
                {isLoggedIn &&(
                    <div className="ButtonHolder"></div>
                )

                }
                
                    <div>
                        {/* <LeftScroll  /> */}
                        <ImageScroller  />
                    </div>

                    <div style={{marginTop:`0%`}} >
                        <TextImageBox  />
                    </div>
                    <div style={{marginTop:`10%`,marginLeft:"1%"}}><TiltedRectangle  /></div>
                    <div style={{marginTop:`10%`}}>
                        <TextImageBox2  />
                    </div>
                
            </div>
            <div style={{marginTop:`20px`, display:`flex`,flexDirection:`column`, gap:`10%`}}>
        <div style={{marginBottom:`5%`,display:`flex`, justifyContent:`center`, alignItems:`center`}}>
      <h1 >Testimonials</h1>
      </div>
        <TestimonialCard  />
      </div>
      <div>
        
      </div>
        </div>

        
        
       

    );
}

export default Hm;