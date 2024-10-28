import React, { useState, useEffect } from 'react';
import './LoginForm.css'; // Import the CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "./image1.png";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [googleLoaded, setGoogleLoaded] = useState(false);
  
  
  useEffect(() => {
    // Check if the google object is available after the script has loaded
    const checkGoogleLoaded = setInterval(() => {
      if (window.google) {
        setGoogleLoaded(true);
        clearInterval(checkGoogleLoaded);
      }
    }, 100); // Poll every 100ms until the script is loaded

    return () => clearInterval(checkGoogleLoaded);
  }, []);

  useEffect(() => {
    if (googleLoaded) {
      window.google.accounts.id.initialize({
        client_id: '443724804555-8eak2q6jjmlk9huk516401pjs4p9vvo8.apps.googleusercontent.com',
        callback: handleGoogleSignIn
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { type: 'standard',theme: 'outline', size: 'large', shape: 'rectangular', width: "1000"  } 
      );
    }
  }, [googleLoaded]);
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const signup = async (username, password, userType) => {
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          username,
          password,
          type: userType,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          navigate('/');  // Redirect to home or another page after signup
        } else {
          setErrorMessage('SignUp failed.');
        }
      } catch (error) {
        setErrorMessage('An error occurred during signup. Please try again.');
        console.error('Error:', error);
      }
    };

    signup(username, password, userType);
  };

  const handleGoogleSignIn = (response) => {
    // Handle Google sign-in token received
    const googleToken = response.credential;
    const signupWithGoogle = async () => {
      try {
        console.log("Tried singup");
        const googleResponse = await axios.post('http://localhost:5000/google-signup', {
          token: googleToken,
          type: userType  // Pass the type (student or faculty) selected in form
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (googleResponse.status === 200) {
          localStorage.setItem('userInfo', JSON.stringify(googleResponse.data));
          navigate('/');  // Redirect after successful Google sign-in
        } else {
          setErrorMessage('Google SignUp failed.');
        }
      } catch (error) {
        setErrorMessage('An error occurred during Google signup. Please try again.');
        console.error('Google SignUp Error:', error);
      }
    };

    signupWithGoogle();
  };

  return (
    <div className="login-container" style={{display:"flex", flexDirection:"row"}}>
      <div className='SignUpImageContainer' >
      <img src={image} alt="image" />
      </div>
      <div className='LoginFormHolder'>
        <div className='LoginTitle'>
        <h1>Welcome!</h1>
        </div>
     
      <form onSubmit={handleSubmit} className="login-form">
      <div id="google-signin-button"></div>
        <div className="separatorOR" style={{display:"flex", flexDirection:"row"}}>
        <hr className='line'/>
        <p style={{margin:'5px', color:"#cac9c9"}}>OR</p>
        <hr className='line'/>
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user-type">User Type:</label>
          <select
            id="user-type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="submit-button">SignUp</button>
      </form>
      
      </div>
       {/* Google sign-in button will be rendered here */}
    </div>
  );
};

export default SignUp;
