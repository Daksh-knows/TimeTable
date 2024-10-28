// Timetable.js
import React from 'react';
import './TimeTableDynamic.css'; // Import CSS file for styling


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
    Monday: 'Theory of Computation',
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
    Friday: 'Machine Learning',
    Saturday: '',
  },
  '11:30 - 12:30': {
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: 'Distributed Computing',
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
    Tuesday: 'Software Engineering',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
  }
  
  
};

function Timetable({visible}) {

    
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
                    <div className='filled-cell'>{timetableData[slot][day]}</div>
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
