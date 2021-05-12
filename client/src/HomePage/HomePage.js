import React from 'react'
import {Redirect} from 'react-router-dom' ;
import "./HomePage.css" ;
import image from "./image1.PNG" ; 
const HomePage = (authorized) => {
    if(!authorized){
        return <Redirect to="/login"/>
      }
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
