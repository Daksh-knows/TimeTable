import React, { useEffect, useState } from 'react';
import ProgressRing from './ProgressRing';
import './NotesList.css';
import UploadNote from './UploadNote';

const NotesList = ({ courseId }) => {
    const [notes, setNotes] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploadedNotes,setuploadedNotes] = useState(2);
    const [totalLecs,settotalLecs] = useState(20);
    const [progress,setProgress] = useState(50);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://localhost:5000/get_notes_by_course/${courseId}`);
                const data = await response.json();

                if (response.ok) {
                    setNotes(data.notes);
                    setuploadedNotes(parseInt(data.uploaded_notes));
                    settotalLecs(data.total_lecs);
                    setProgress(parseFloat(data.uploaded_notes)/parseFloat(data.total_lecs)*100)
                } else {
                    setError(data.message || 'Failed to fetch notes');
                }
            } catch (err) {
                setError('Error fetching notes');
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [courseId]);

    if (loading) return <p>Loading notes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{display:'flex', gap:"30px"}}>
            <div className="notes-grid-holder" style={{width:"50%",overflowY:"auto",maxHeight:"420px"}}>
                <h2 style={{textAlign:"center"}}>Course Notes</h2>
            <div  className="notes-grid">
                    <div>Lecture No</div>
                    <div>Lecture Topic</div>
                    <div>Download Link</div>
            </div>
            <div>
            {notes.map(note => (
                <div key={note.note_id} className="notes-grid">
                    <div>{note.lecture_no}</div>
                    <div>{note.lecture_topic}</div>
                    <a href={note.file_path} download>Download</a>
                </div>
            ))}
            </div>
            </div>
            <div className='progressholder' >
                <UploadNote  course_id={courseId}/>
                {/* <ProgressRing  radius={100} stroke={20} progress={progress}/>
                <p>{uploadedNotes}/{totalLecs} notes uploaded</p> */}
            </div>
        </div>
    );
};

export default NotesList;
