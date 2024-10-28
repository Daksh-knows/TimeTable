import React from "react";
import './NotesCard.css';

function NotesCard({ subject, notes_up, notes_exp, color }) {
    var pct = notes_up/notes_exp*100;
    const styles = {
        
        backgroundColor: color,
        
        width: `${pct}%`
        
      };

    // const styles2 = {
        
    //     backgroundColor: "black",
        
    //     width: `${100-pct}%`
        
    //   };
  return (
    <div className="NotesBox">
      <div className="NotesBar" >
       <div className="color1" style={styles}> <p></p></div>
       <div className="color2" style={{backgroundColor: "rgb(224, 221, 221)", width: `${100-pct}%`, marginLeft: 0}}><p></p></div>
        <p></p>
      </div>
      <div className="NotesText">
        <div className="NotesSubject">
          <p>{subject}</p>
        </div>
        <div className="NotesUploaded">
          <p>{notes_up}/{notes_exp}</p>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;