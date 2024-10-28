import React from "react"
import "./TiltedRectangle.css"

function TiltedRectangle(){
    return(
        <div className="OuterContainer">
            <div className="BackgroundDiv">
                <p></p>
            </div>
            <div className="OverlayDiv">
                <div className="OverlayText" style={{fontSize: `20px`,  padding:`20px`}}>
                    <h1>Ready to Optimize Time Management?</h1>
                    <p>Sign Up and take control of your schedule!</p>
                </div>
                <div className="OverlayButton">
                <button  className="OvBtn">Register Now</button>
                </div>
            </div>
        </div>
    );
}

export default TiltedRectangle;