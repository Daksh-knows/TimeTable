import React from "react";
import Courses from "./Courses";
// import TimeTable from "./TimeTable";
import ttImage from './tt.png'; // Import the image
import NotesCard from "./NotesCard";
import "./App.css"; 
import LeftScroll from "./LeftScroll";
import TiltedRectangle from "./TiltedRectangle";
import TextImageBox from "./TextImageBox";
import TextImageBox2 from "./TextImageBox2";
import Hm from "./Hm";
import TestimonialCard from "./TestimonialCard";
import LoginPage from './LoginPage';


function App() {
  return (
    <div className="App" style={{backgroundColor:`white`}}>
      {/* <header>
        <nav className="navbar">
          <h1 className="logo">ET</h1>
        </nav>
      </header>
      
      <main>
        <section className="courses-section">
          <h2>Your Courses</h2>
          <p>December 2023</p>
          <Courses />
        </section>
        <div className="Box">
           <div style={{display: "flex", flexDirection: "column"}}>
          <h2>Time Table</h2>
          <img src={ttImage} alt="Time Table" />
          
          </div>
        
        
       <div className="NotesBars" style={{marginLeft: `100px`}}>
        <h2 style={{marginLeft: `10px`}}>Notes</h2>
        <NotesCard
        subject="Machine Learning"
        notes_up={8}
        notes_exp={10}
        color="#d0c1ff"
      />
      <NotesCard
        subject="Project Planning"
        notes_up={5}
        notes_exp={10}
        color="#C8F1CA"
      />
      <NotesCard
        subject="Algorithm Analysis"
        notes_up={7}
        notes_exp={11}
        color="#C8F1E5"
      />
      <NotesCard
        subject="Cloud Computing"
        notes_up={9}
        notes_exp={9}
        color="#FDE3D8"
      />
      </div>

      </div>

      <div>
        <LeftScroll  />
      </div>
      <div>
      <TiltedRectangle  />
      </div>
     <div>
      <TextImageBox  /> 
     </div>
     <div>
      <TextImageBox2  /> 
     </div>

        
      </main> */}
      
      

    </div>
  );
}

export default App;
