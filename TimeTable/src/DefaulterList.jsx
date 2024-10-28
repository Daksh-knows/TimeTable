import React, { useEffect, useState } from 'react';

const DefaulterList = ({ courseId }) => {
  const [defaulters, setDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to run the fetch on component mount
  useEffect(() => {
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
          setDefaulters(data.defaulters || []); // Set the defaulters list
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
    <div>
      <h1>Defaulter List for the Course</h1>
      {defaulters.length === 0 ? (
        <p>No defaulters found</p>
      ) : (
        <ul>
          {defaulters.map((defaulter) => (
            <li key={defaulter.student_id}>
              {defaulter.student_name} - {defaulter.attendance_percentage}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DefaulterList;
