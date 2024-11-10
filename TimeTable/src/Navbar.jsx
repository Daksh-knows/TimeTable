// Navbar.js
import React, {useState} from 'react';
import './Navbar.css'; // Import the CSS file for styling
import profile_pic from "./profile.jpg"
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [username, setUsername] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userType, setUserType] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); 
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload();
  }

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  React.useEffect(() => {
    const token = localStorage.getItem('userInfo');

    if (token) {
        try {
            const token_data = JSON.parse(token);
            console.log(token_data.username);
            setUsername(token_data.username); // Adjust based on your token structure
            setUserType(token_data.type);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }
}, []);



const handleCourseClick = (e)=>{
  e.preventDefault()
  if(isLoggedIn){
    if(userType ==='student'){
      navigate('/MyCourses')
    }
    else{
      navigate('/MyCoursesTeach')
    }
  }
}

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Logo</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/AboutUs">About</a></li>

        <li onClick={handleCourseClick}><a href="/">My Courses</a></li>
        <li><a href="/contact">Contact</a></li>
        {isLoggedIn && (
                        <div style={{display:"flex", marginLeft:"10vw",  flexDirection:"column", cursor:"pointer"}}  >
                                <div style={{display:"flex"}} onClick={handleProfileClick}>
                                <img
                                    src={profile_pic} // Replace with your profile icon path
                                    alt="Profile"
                                    style={{width:"40px",height:"40px",marginTop:"0px"}}
                                />
                                <span style={{marginLeft:"10px",marginTop:"15px",fontWeight:"600"}}>{username}</span>
                                </div>
                                
                                <div div className={`profile-dropdown ${dropdownVisible ? 'show' : ''}`}>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                <img
                                    src={profile_pic} // Replace with your profile icon path
                                    alt="Profile"
                                    style={{width:"40px",height:"40px",marginTop:"0px"}}
                                />
                                <h1 style={{marginLeft:"10px",marginTop:"15px"}}>Hi, {username}!</h1>
                                </div>
                                <div className="ProfileOptions" style={{display:"flex"}}>
                                <i class="fi fi-br-settings"></i>
                                <a href="/settings">Settings</a>
                                </div>
                                <div className="ProfileOptions" style={{display:"flex"}}>
                                <i class="fi fi-br-envelope"></i>
                                <a href="/mode">Email</a>
                                </div>
                                <div className="ProfileOptions" style={{display:"flex"}} onClick={handleLogout}>
                                <i class="fi fi-br-exit"></i>
                                <a  style={{ cursor: 'pointer' }}>Logout</a>
                                </div>
                                
                                
                                
                                </div>
                            
                        </div>
                    ) }

      </ul>
    </nav>
  );
}

export default Navbar;
