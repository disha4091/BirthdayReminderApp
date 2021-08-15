import React from 'react'
import "./HomePage.css" ;
import image from "./image1.PNG" ; 
const HomePage = () => {
  
    return (
        <div className="container">
            <img className="image" src={image} ></img>
            <div className="middle">
                <div className="text" >Get Started!</div>
            </div>
        
            
        </div>
    )
}

export default HomePage
