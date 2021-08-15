import React, { useState,useContext, useReducer,useEffect } from 'react';
import Axios from "axios" ;
import "./LoginPage.css"

import { AuthContext } from '../auth' ;

const LoginPage = () => {
    const [user, setUser] = useState() ;
    const context = useContext(AuthContext) ;
    const [usernameReg,setUsernameReg] = useState('') ;
    const [passwordReg,setPasswordReg] = useState('') ;

    const [username,setUsername] = useState('') ;
    const [password,setPassword] = useState('') ;

    const [loginStatus,setLoginStatus] = useState(false) ;

    Axios.defaults.withCredentials = true ;

    const register=()=>{
        Axios.post('http://localhost:3001/register' , {Username: usernameReg, Password: passwordReg})
        .then((response)=>{
            context.login(response) ;
        }) ;
    } ;

    const loginUser=async e=>{
        e.preventDefault() ;
        await Axios.post('http://localhost:3001/login' , {Username: username, Password: password})
        .then((response)=>{
            if(response.data.auth){
                localStorage.setItem("token", response.data.token) ;
                setLoginStatus(true) ;
                console.log(response.data.result[0]) ;
                context.login(response.data.result[0]) ;
                
            }
        }) ;

    } ;

    const userAuthenticated = () => {
        Axios.get("http://localhost:3001/isUserAuth",{headers:{
            "x-access-token" : localStorage.getItem("token") 
        }}).then((response)=>{
            console.log(response);
        }) 
    }

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
                <button onClick={loginUser}>Login</button>

            </div>
            
        {loginStatus && (
            <button onClick={userAuthenticated}>Check</button>
        )}
            
        </div>
        
        
    ) ;
}
//<h2 className="currname"> {loginStatus} </h2>
export default LoginPage