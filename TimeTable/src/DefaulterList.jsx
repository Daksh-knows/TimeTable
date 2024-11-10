import React, { useEffect, useState } from 'react';
import "./DefaulterList.css"

const DefaulterList = ({ courseId }) => {
  const [defaulters, setDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to run the fetch on component mount
  useEffect(() => {

    // const savedDefaulters = localStorage.getItem(`defaulters_${courseId}`);

    
      // Fetch the data if it’s not in localStorage
      const fetchDefaulters = async () => {
        try {
          console.log(courseId);
          const response = await fetch('http://localhost:5000/find_defaulters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course_id: courseId }),
          });

          const data = await response.json();
          
          if (response.ok) {
            setDefaulters(data.defaulters || []);
            localStorage.setItem(`defaulters_${courseId}`, JSON.stringify(data.defaulters || [])); // Save to localStorage
          } else {
            setError(data.message || 'Error fetching defaulter list');
          }
        } catch (err) {
          setError('Error fetching defaulter list');
        } finally {
          setLoading(false);
        }
      };

      fetchDefaulters();
    
  }, [courseId]); // Dependency array ensures this runs once when component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="defaulter-list-container">
      <h1 className="defaulter-list-header">Defaulter List for the Course</h1>
      {defaulters.length === 0 ? (
        <p className="no-defaulters-message">No defaulters found</p>
      ) : (
        <ul className="defaulter-list" style={{ overflowY: "auto", maxHeight: "50vh" }}>
           <li className="defaulter-item">
           <span className='defaulter-id'>Id</span>
              <span className="defaulter-name">Name</span>
              <span className="defaulter-percentage">
              Percent
              </span>
            </li>
          {defaulters.map((defaulter) => (
            <li className="defaulter-item" key={defaulter.student_id}>
              <span className='defaulter-id'>{defaulter.student_id}</span>
              <span className="defaulter-name">{defaulter.student_name}</span>
              <span className="defaulter-percentage">
              {(defaulter.attendance_percentage).toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DefaulterList;
