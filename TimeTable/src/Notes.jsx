import React from "react";

function Notes() {
  const notes = [
    { title: "Machine Learning", progress: "8/10", color: "#d0c1ff" },
    { title: "Project Management", progress: "8/10", color: "#d0ffc1" },
    { title: "Algorithm Analysis", progress: "8/10", color: "#c1fff3" },
    { title: "Cloud Computing", progress: "10/10", color: "#ffd6c1" },
  ];

  return (
    <div className="notes">
      {notes.map((note, index) => (
        <div key={index} className="note-item">
          <p>{note.title}</p>
          <div className="progress-bar" style={{ backgroundColor: note.color }}>
            {note.progress}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;
