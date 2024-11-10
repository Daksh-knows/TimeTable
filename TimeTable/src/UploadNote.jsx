import React, { useState } from 'react';
import HoverButton from './HoverButton';

function UploadNote({course_id}) {
  const [file, setFile] = useState(null);
  // const [courseId, setCourseId] = useState('');
  const [lectureNo, setLectureNo] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('course_id', course_id);
    formData.append('lecture_no', lectureNo);
    
    try {
      const response = await fetch('http://localhost:5000/upload_note', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("File uploaded successfully! URL: " + data.file_url);
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (err) {
      setMessage("Upload failed.");
    }
  };

  return (
    <div >
      <h2 style={{textAlign:"center"}}>Upload Notes</h2>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          value={course_id}
          onChange={(e) => setCourseId(e.target.value)}
          placeholder="Course ID"
          disabled
        /> */}
        <input
          type="text"
          value={lectureNo}
          onChange={(e) => setLectureNo(e.target.value)}
          placeholder="Lecture No"
          required
          style={{marginTop:"50px"}}
        />
        <input type="file" onChange={handleFileChange} required style={{marginTop:"50px"}}/>
        <div style={{display:"flex",marginTop:"50px", alignItems:"center",justifyContent:"center"}}>
        <HoverButton type={"submit"} text={"Upload Notes"} color={"#2c3e50"}/>
        </div>
        
      </form>
      {/* <p>{message}</p> */}
    </div>
  );
}

export default UploadNote;
