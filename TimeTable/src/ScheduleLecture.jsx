import React, { useState } from 'react';
import './ScheduleLecture.css'; // Import the CSS for styling

const ScheduleLecture = () => {
  const [lectureNo, setLectureNo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [teacherId, setTeacherId] = useState('1'); // Default teacher ID (You can make it dynamic)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const lectureData = {
      lecture_no: lectureNo,
      date: date,
      time: time,
      teacher_id: teacherId
    };

    // Post data to backend
    fetch('http://localhost:5000/schedule-lecture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lectureData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Lecture scheduled:', data);
        alert('Lecture scheduled successfully');
      })
      .catch((error) => {
        console.error('Error scheduling lecture:', error);
        alert('Failed to schedule lecture');
      });
  };

  return (
    <div className="schedule-lecture-container">
      {/* Left section: Iframe to show timetable */}
      <div className="timetable-section">
        <h2>Teacher Timetable</h2>
        <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&showPrint=0&src=ZGFrc2hqYWluNjI0QGdtYWlsLmNvbQ&src=MWU0ZmI0YzVkM2VkYjU4ZmViZDkxNWE2MjVmYTlmMTZhOGVhNjEzMDdlYWE0YzBjODQ4OWMwNTBhMjg1YzczMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTEzMzAxNTkyNTA5NjkzNTMxMzYyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE0NTU3NDU4NzAzNTg5NjI4ODA3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTEzMjYxNTUxNDEzNzEzNjAyNTM1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE0MjkyMDY0MjU1MDY4ODUzNDY3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA2MTQ3MzMwNzE4MjI0NjYwMTY5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE2OTc1MzU5ODkzODU5MDc3Mzc5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTEyMTEwNTIyODY3MzA0NTU5MjUyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTAzNDkwNzIwMDAwNjI3NjA1MjkzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE3NDM1MjAyMDAyNTQ5NzgzMjIzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA0NDQ5NzE0OTE2MzA5MTI4NDYxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTAwODQ0OTkwMzYxMjg1MjA2MDExQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA3ODExMzUyMDMwNjM5NDI0NDg2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%23B39DDB&color=%230047a8&color=%23007b83&color=%230047a8&color=%23202124&color=%237627bb&color=%23174ea6&color=%23174ea6&color=%237627bb&color=%23137333&color=%237627bb&color=%23b80672&color=%237627bb" style={{border: "solid 1px #777", width: "100%" ,height :"100%" ,frameborder:"0" ,scrolling :"no"}}></iframe>
      </div>

      {/* Right section: Form to schedule lecture */}
      <div className="form-section">
        <h2>Schedule a Lecture</h2>
        <form onSubmit={handleSubmit} className="schedule-form">
          <div className="form-group">
            <label htmlFor="lectureNo">Lecture No:</label>
            <input
              type="number"
              id="lectureNo"
              value={lectureNo}
              onChange={(e) => setLectureNo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Schedule Lecture</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleLecture;
