import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file for styling
import axios from 'axios';
import image from "./image1.png";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    const login = async (username, password) => {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          username: username,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          console.log('Login successful.');

          // Store the token in localStorage
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          navigate('/');
        } else {
          setErrorMessage('Login failed.');
        }
      } catch (error) {
        setErrorMessage('An error occurred during login. Please try again.');
        console.error('Error:', error);
      }
    };

    login(username, password);
  };

  const handleGoogleSignIn = (response) => {
    // Handle Google sign-in token received
    const googleToken = response.credential;
    const loginWithGoogle = async () => {
      try {
        const googleResponse = await axios.post('http://localhost:5000/google-login', {
          token: googleToken
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (googleResponse.status === 200) {
          localStorage.setItem('userInfo', JSON.stringify(googleResponse.data));
          navigate('/');
        } else {
          setErrorMessage('Google login failed.');
        }
      } catch (error) {
        setErrorMessage('An error occurred during Google login. Please try again.');
        console.error('Google Sign-In Error:', error);
      }
    };

    loginWithGoogle();
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
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="submit-button">Login</button>
      </form>
      </div>
       {/* Google sign-in button will be rendered here */}
    </div>
  );
};

export default LoginForm;
