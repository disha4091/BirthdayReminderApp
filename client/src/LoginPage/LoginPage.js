import React, { useState, useReducer,useEffect } from 'react';
import { useHistory } from "react-router-dom" ;
import Axios from "axios" ;
import "./LoginPage.css"
var isLoggedIn = false ;

//import './LoginPage.css'
const LoginPage = () => {
    let history = useHistory() ;
    
    const [usernameReg,setUsernameReg] = useState('') ;
    const [passwordReg,setPasswordReg] = useState('') ;

    const [username,setUsername] = useState('') ;
    const [password,setPassword] = useState('') ;

    const [loginStatus,setLoginStatus] = useState('') ;

    Axios.defaults.withCredentials = true ;

    const register=()=>{
        Axios.post('http://localhost:3001/register' , {Username: usernameReg, Password: passwordReg})
        .then((response)=>{
            console.log(response);
        }) ;
    } ;

    const login=()=>{
        Axios.post('http://localhost:3001/login' , {Username: username, Password: password})
        .then((response)=>{
            if(response.data.message){
                setLoginStatus(response.data.message) ;
                isLoggedIn = false ;
                
            }else{
                setLoginStatus(response.data[0].Username) ;history.push('/') ;
                isLoggedIn = true ;

            }
            console.log(response.data) ;
            
        }) ;
    } ;

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response)=>{
            if(response.data.loggedIn == true){
                setLoginStatus(response.data.user[0].Username) ;
            }
                
        })
    
    }, []) ;

    return (
        
        <div>
            <div className="register">
                <h2><b>Please Register here !</b></h2>
                <label>Username</label>
                <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}}/>
                <br></br><br></br>
                <label>Password</label>
                <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                <br></br><br></br>
                <button onClick={register}>Register</button>
                <br></br><br></br>
            </div>


            <div className="login">
            <br></br>
                <h2>Please Login here !</h2>
                <label>Username   </label>
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                <br></br> <br></br>
                <label>Password</label>
                <input type="text" onChange={(e)=>{setPassword(e.target.value)}}/>
                <br></br><br></br>
                <button onClick={login}>Login</button>

            </div>
            

           
            <h2 className="currname"> {loginStatus} </h2>
        </div>
        
        
    ) ;
}

export default LoginPage