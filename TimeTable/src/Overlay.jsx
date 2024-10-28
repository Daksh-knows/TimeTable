import React from "react";
import "./Overlay.css"

function Overlay({isOpen,onClose,children}){
    if (!isOpen) return null;
    return(
        <div className="overlay" onClick={onClose}>
             
        <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="CloseButton"  onClick={onClose}>X</button>
          {children}
         
        </div>
      </div>
    );
}

export default Overlay;