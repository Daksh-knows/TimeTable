import React from "react";
import "./HoverButton.css"
import { useState } from "react";

function HoverButton({type,text,color}){
    const [isHovered, setIsHovered] = useState(false);
    return(
        <div >
            
            <button type={type} style={{ color: isHovered? 'white':`${color}`,border:`solid 2px ${color}`}}className="Hoverbtn" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>{text}</button>
        </div>
    );
}

export default HoverButton;