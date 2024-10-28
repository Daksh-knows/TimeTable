import React, { useState } from "react";
import "./TextImageBox.css";

function TextImageBox() {
    const [imageSrc, setImageSrc] = useState('image1.png'); // Initial image
    const [selectedText, setSelectedText] = useState('text1'); // Initial selected text

    const handleImageChange = (newImageSrc, textKey) => {
        setImageSrc(newImageSrc); // Update the image based on the clicked text
        setSelectedText(textKey); // Update the selected text
    };

    return (
        <div className="TextImageContainer">
            <div className="TextContainer">
                <div 
                    className={`Text ${selectedText === 'text1' ? 'SelectedText' : ''}`} 
                    onMouseEnter={() => handleImageChange('image1.png', 'text1')}
                >
                    <h1>Schedule Classes</h1>
                    <p>Teachers can easily schedule classes and set up lecture timings.</p>
                </div>
                <div 
                    className={`Text ${selectedText === 'text2' ? 'SelectedText' : ''}`} 
                    onMouseEnter={() => handleImageChange('image2.png', 'text2')}
                >
                    <h1>Automatic Timetable Generation</h1>
                    <p>Our algorithm generates a timetable for students based on their courses and availability.</p>
                </div>
                <div 
                    className={`Text ${selectedText === 'text3' ? 'SelectedText' : ''}`} 
                    onMouseEnter={() => handleImageChange('image3.png', 'text3')}
                >
                    <h1>Attendance Tracking</h1>
                    <p>Track attendance records for both teachers and students to monitor class participation.</p>
                </div>
            </div>
            <div style={{width:`40%`, height:`20%`, marginLeft:`10%`,  marginTop:`4%`,   overflow: `hidden` }}>
                <img src={require(`./${imageSrc}`)} alt="Switchable" style={{ maxHeight:`400px`, objectFit:`cover`,width: '100%', height: '100%', borderRadius:`10px`}} />
            </div>
        </div>
    );
}

export default TextImageBox;
