import React, { useState, useReducer } from 'react';
import Axios from "axios" ;

//import './LoginPage.css'
const LoginPage = () => {
    const [usernameReg,setUsernameReg] = useState('') ;
    const [passwordReg,setPasswordReg] = useState('') ;

    const [username,setUsername] = useState('') ;
    const [password,setPassword] = useState('') ;

    const [loginStatus,setLoginStatus] = useState('') ;

    const register=()=>{
        Axios.post('http://localhost:3001/register' , {Username: usernameReg, Password: passwordReg})
        .then((response)=>{
            console.log(response);
        }) ;
    } ;

    const login=()=>{
        Axios.post('http://localhost:3001/login' , {Username: username, Password: password})
        .then((response)=>{
            console.log(response.data) ;
            
        }) ;
    } ;

    return (
        
        <div>
            <h2><b>Please Register here !</b></h2>
            <label>Username</label>
            <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}}/>
            <label>Password</label>
            <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
            <button onClick={register}>Register</button>
            <br></br> <br></br>

            <h2>Please Login here !</h2>
            <label>Username</label>
            <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
            <label>Password</label>
            <input type="text" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={login}>Login</button>

            <h2> {loginStatus} </h2>
        </div>
        
        
    ) ;
}

export default LoginPage