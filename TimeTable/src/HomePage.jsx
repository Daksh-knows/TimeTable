import React from "react";
import Image1 from "./images.jpg";
import Image2 from "./image.avif"
import Image3 from "./Slide1.webp"
import "./HomePage.css"


function HomePage(){
    return(
        <div className="GalleryContainer">
       <div className="ImageScrollBar">
        <div className="ImageContainer">
            <img src={Image1} className="ImageFit" alt="Img1"/>
        </div>
        <div className="ImageContainer">
            <img src={Image2} className="ImageFit" alt="Img1"/>
        </div>
        <div className="ImageContainer">
            <img src={Image3} className="ImageFit" alt="Img1"/>
        </div>
        <div className="ImageContainer">
            <img src={Image1} className="ImageFit" alt="Img1"/>
        </div>
        <div className="ImageContainer">
            <img src={Image2} className="ImageFit" alt="Img1"/>
        </div>
        <div className="ImageContainer">
            <img src={Image3} className="ImageFit" alt="Img1"/>
        </div>
       </div> 
       </div>
    )
}

export default HomePage;