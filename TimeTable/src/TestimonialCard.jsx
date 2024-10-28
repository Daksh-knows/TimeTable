import React from "react"
import "./TestimonialCard.css"
import messi from "./messi.png"

function TestimonialCard(){
    return(
        <div className="Cont">
            
        <div className="TestOuterContainer">
           
            <div className="TestOverlayDiv">

                <div className="TestOverlayText">
                    <div style={{display:`flex`, alignItems:`center`, gap:`5%`}}>
                    <div className="profile-image">
                        <img src={messi} alt="im" />
                    </div>
                    <h1>Lionel Messi</h1>
                    </div>
                    
                    <p>This system has helped me keep track of my classes, schedule lectures efficiently, and monitor student attendance. It's a game-changer for educators!</p>
                </div>
                
            </div>
        </div>
        <div className="TestOuterContainer">
           
            <div className="TestOverlayDiv">

                <div className="TestOverlayText">
                    <div style={{display:`flex`, alignItems:`center`, gap:`5%`}}>
                    <div className="profile-image">
                        <img src={messi} alt="im" />
                    </div>
                    <h1>Lionel Messi</h1>
                    </div>
                    <p>As a student, this platform has been incredibly helpful in managing my courses and knowing when my lectures are scheduled. It's user-friendly and has made my academic life much easier.</p>
                </div>
                
            </div>
        </div>
        <div className="TestOuterContainer">
           
            <div className="TestOverlayDiv">

                <div className="TestOverlayText">
                    <div style={{display:`flex`, alignItems:`center`, gap:`5%`}}>
                    <div className="profile-image">
                        <img src={messi} alt="im" />
                    </div>
                    <h1>Lionel Messi</h1>
                    </div>
                    
                    <p>Our school started using this system last semester, and the impact has been remarkable. It has streamlined our timetable management process and improved overall efficiency.</p>
                </div>
                
            </div>
        </div>
        <div className="TestOuterContainer">
           
            <div className="TestOverlayDiv">

                <div className="TestOverlayText">
                    <div style={{display:`flex`, alignItems:`center`, gap:`5%`}}>
                    <div className="profile-image">
                        <img src={messi} alt="im" />
                    </div>
                    <h1>Lionel Messi</h1>
                    </div>
                    
                    <p>I love how this system keeps me informed about my child's class schedule and exam dates. It's a great tool for parents to stay involved in their child's education.</p>
                </div>
                
            </div>
        </div>
        
        </div>
    );
}

export default TestimonialCard;