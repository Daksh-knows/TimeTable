// Timetable.js
import React from 'react';
import './TimeTableStatic.css'; // Import CSS file for styling
import TOC from "./TOC.png";
import Dc from "./DistributedComputing.png"
import Se from "./SE.png"
import prob from "./Probability.png"

const timeSlots = [
  '9:30 - 10:30',
  '10:30 - 11:30',
  '11:30 - 12:30',
  '12:30 - 1:30',
  '1:30 - 2:30',
  
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timetableData = {
  // Example data, replace with actual image URLs or paths
  '9:30 - 10:30': {
    Monday: TOC,
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
  },
  // Add data for other time slots similarly
  '10:30 - 11:30': {
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
  },
  '10:30 - 11:30': {
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: prob,
    Saturday: '',
  },
  '11:30 - 12:30': {
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: Dc,
  },
  '12:30 - 1:30': {
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
  },
  '1:30 - 2:30': {
    Monday: '',
    Tuesday: Se,
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
  }
  
  
};

function Timetable({visible}) {

    const imageStyle = {
        opacity: visible ? 1 : 0, // If `visible` is 1, fully visible; if 0, fully hidden
        objectFit: "cover"
        
      };
  return (
    <div className="timetable-container">
      <table className="timetable">
        <thead>
          <tr>
            <th>Time Slot</th>
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(slot => (
            <tr key={slot}>
              <td>{slot}</td>
              {days.map(day => (
                <td key={day} className="cell">
                  {timetableData[slot][day] ? (
                    <img src={timetableData[slot][day]}  alt={`${day} ${slot}`} style={imageStyle}/>
                  ) : (
                    <div className="empty-cell"></div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
