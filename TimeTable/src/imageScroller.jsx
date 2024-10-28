import React, { useState, useEffect } from 'react';
import './imageScroller.css';
import image from "./TOC.png";
import image1 from "./Probability.png";
import image2 from "./SE.png";
import image3 from "./DistributedComputing.png";
import Timetable from './TimeTableStatic';

// ImageScroller.js
// Ensure the CSS file is correctly imported

function ImageScroller() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [fixedPosition, setFixedPosition] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define the stopping point (e.g., 800px)
  const stopPoint = 800;
  const isFixed = scrollPosition >= stopPoint;
  
  const opacity = scrollPosition >= stopPoint ? 0 : 1;
  const show = scrollPosition >= stopPoint ? true : false;
  

  // Calculate the translation amounts
  const translateY = scrollPosition < stopPoint ? scrollPosition * 0.1 : stopPoint * 0.1;
  const translateX = scrollPosition < stopPoint ? scrollPosition * 0.2 : stopPoint * 0.2;
  const rotation = scrollPosition < stopPoint ? 40 - (scrollPosition / stopPoint) * 40 : 0;
  const translateY2 = scrollPosition < stopPoint ? scrollPosition * 0.23 : stopPoint * 0.23;
  const translateX2 = scrollPosition < stopPoint ? scrollPosition * 0.3 : stopPoint * 0.3;
  const rotation2 = scrollPosition < stopPoint ? 40 - (scrollPosition / stopPoint) * 40 : 0;
  const translateY3 = scrollPosition < stopPoint ? scrollPosition * 0.37 : stopPoint * 0.37;
  const translateX3 = scrollPosition < stopPoint ? scrollPosition * 0.6 : stopPoint * 0.6;
  const rotation3 = scrollPosition < stopPoint ? 40 - (scrollPosition / stopPoint) * 40 : 0;
  const translateY4 = scrollPosition < stopPoint ? scrollPosition * 0.1 : stopPoint * 0.1;
  const translateX4 = scrollPosition < stopPoint ? scrollPosition * 0.22 : stopPoint * 0.22;
  const rotation4 = scrollPosition < stopPoint ? 40 - (scrollPosition / stopPoint) * 40 : 0;

  return (
    <div className="container">
      <div className="moving-div" style={{ opacity:opacity ,transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)` }}>
        <img src={image} alt="Moving Image" style={{opacity:"50%"}} />
      </div>
      <div className="moving-div2" style={{ opacity:opacity ,transform: `translateX(${-translateX2}px) translateY(${translateY2}px) rotate(${-rotation2}deg)` }}>
        <img src={image1} alt="Moving Image" style={{opacity:"50%"}}/>
      </div>
      <div className="moving-div3" style={{ opacity:opacity ,transform: `translateX(${translateX3}px) translateY(${translateY3}px) rotate(${-rotation3}deg)` }}>
        <img src={image2} alt="Moving Image"style={{opacity:"50%"}} />
      </div>
      <div className="moving-div4" style={{ opacity:opacity ,transform: `translateX(${-translateX4}px) translateY(${translateY4}px) rotate(${rotation4}deg)` }}>
        <img src={image3} alt="Moving Image"style={{opacity:"50%"}} />
      </div>
      <div style={{marginLeft:'0%'}}>
        <Timetable  visible = {show}/>
      </div>
      <div className="spacer"></div>
      
    </div>
  );
}

export default ImageScroller;
