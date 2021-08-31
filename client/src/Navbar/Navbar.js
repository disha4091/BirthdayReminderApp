import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AuthContext, AuthProvider } from "../auth";
import Axios from "axios";

import "./Navbar.css";
const Navbar = () => {

  const { user, logout } = useContext(AuthContext); 
  const [currUser, setCurrUser] = useState("");
  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth",{headers:{
        "x-access-token" : localStorage.getItem("token") 
    }}).then((response)=>{
        console.log(response);
    }) 
}
  useEffect(() => {
    document.title = "RemindMe";
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        if(user){
          console.log(user);
          setCurrUser((user.Username));
        }
        
        //setCurrUser(response.data.user[0].Username);
      }

    })

  },[user]);

  const onLogout = () => {
    logout() ;
    
  }
  
  const menu = user ? (
    
    <div class="nav">
  <input type="checkbox" id="nav-check"/>
  <div class="nav-header">
    <div class="nav-title">
    📆RemindMe
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
  <a href="/">Home</a>
  <a href="/lists">Events</a>
  <a href="/reminder">Reminders</a>
  <a href="/form">Add</a>
  <a href="/" onClick={onLogout}>Logout</a>

  </div>
</div>
   
  ) : (
    <div class="nav">
  <input type="checkbox" id="nav-check"/>
  <div class="nav-header">
    <div class="nav-title">
      📆RemindMe
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
  <a href="/login" >Login</a>
  <a href="/">Home</a>

  </div>
</div>
);
  return (
    menu

  )
}

export default Navbar;
