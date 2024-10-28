import React, { useState } from "react";
import "./TextImageBox2.css";

function TextImageBox2() {
    const [imageSrc, setImageSrc] = useState('image4.png'); // Initial image
    const [selectedText, setSelectedText] = useState('text1'); // Initial selected text

    const handleImageChange = (newImageSrc, textKey) => {
        setImageSrc(newImageSrc); // Update the image based on the clicked text
        setSelectedText(textKey); // Update the selected text
    };

    return (
        <div className="TextImageContainer">
            <div style={{ width:`40%`, height:`20%`, marginRight:`10%`, marginTop:`4%`,   overflow: `hidden` }}>
                <img src={require(`./${imageSrc}`)} alt="Switchable" style={{ maxHeight:`400px`, objectFit:`cover`,width: '100%', height: '100%', borderRadius:`10px`}} />
            </div>
            <div className="TextContainer">
                <div 
                    className={`Text ${selectedText === 'text1' ? 'SelectedText' : ''}`} 
                    onMouseEnter={() => handleImageChange('image4.png', 'text1')}
                >
                    <h1>Exam Records Management</h1>
                    <p>Efficiently manage exam records for both teachers and students.</p>
                </div>
                <div 
                    className={`Text ${selectedText === 'text2' ? 'SelectedText' : ''}`} 
                    onMouseEnter={() => handleImageChange('image5.png', 'text2')}
                >
                    <h1>Notes Upload & Access</h1>
                    <p>Teachers upload notes easily, and students access them instantly for a streamlined learning experience.</p>
                </div>
                <div 
                    className={`Text ${selectedText === 'text3' ? 'SelectedText' : ''}`} 
                    onMouseEnter={() => handleImageChange('image6.png', 'text3')}
                >
                    <h1>Detailed analysis</h1>
                    <p>Track and Analyze Marks, Attendance, and Metrics"</p>
                </div>
            </div>
            
        </div>
    );
}

export default TextImageBox2;
