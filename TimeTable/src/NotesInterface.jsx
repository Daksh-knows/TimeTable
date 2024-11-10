import React, { useState } from 'react';
import UploadNote from './UploadNote';
import NotesList from './NotesList';

function NotesInterface({course_id}) {
  const [notes, setNotes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  
 

  

  return (
    <div className="notes-interface">
      <h2>Course Notes</h2>
      
      {/* Upload Section */}
      
      
      {/* Notes List Section */}
      <div className="notes-list">
        <NotesList  courseId = {course_id}/>
      </div>

      
    </div>
  );
}

export default NotesInterface;
