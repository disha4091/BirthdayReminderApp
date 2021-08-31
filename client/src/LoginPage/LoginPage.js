import React, { useState,useContext,useEffect } from 'react';
import { useHistory } from 'react-router-dom' ;
import Axios from "axios" ;
import "./LoginPage.css"

import { AuthContext } from '../auth' ;

const LoginPage = () => {
    const [user, setUser] = useState() ;
    const context = useContext(AuthContext) ;
    const [usernameReg,setUsernameReg] = useState('') ;
    const [passwordReg,setPasswordReg] = useState('') ;
    const [passwordReg1,setPasswordReg1] = useState('') ;
    const [username,setUsername] = useState('') ;
    const [password,setPassword] = useState('') ;

    const [loginStatus,setLoginStatus] = useState("") ;
    const [isLoggedIn,setIsLoggedIn] = useState(false) ;

    const [hidden, setHidden] = useState("nothidden") ;
    const [errors, setErrors] = useState("") ;

    const history = useHistory();


    Axios.defaults.withCredentials = true ;

    const register=()=>{
        if(usernameReg === ""){
            setErrors("Username must not be empty") ;
        }
        if(passwordReg === ""){
            setErrors("Password must not be empty") ;
        }
        else if(passwordReg !== passwordReg1){
            setErrors("Passwords do not match") ;
        }
        else{
            Axios.post('http://localhost:3001/register' , {Username: usernameReg, Password: passwordReg})
            .then((response)=>{
                if(response.data.message){
                    console.log(response.data);
                    setErrors(response.data.message) ;
                }
                else{
                    console.log("no error") ;
                    context.login(response) ; 
                }
                
            
            }) ;
        }
        setUsernameReg("");
        setPasswordReg("");
        setPasswordReg1("");
    } ;

    const loginUser=async e=>{
        e.preventDefault() ;
        await Axios.post('http://localhost:3001/login' , {Username: username, Password: password})
        .then((response)=>{
            if(response.data.message){
                console.log(response.data.message);
                setLoginStatus(response.data.message) ;
            }
            else{
                if(response.data.auth){
                localStorage.setItem("token", response.data.token) ;
                setLoginStatus("") ;
                setIsLoggedIn("true") ;
                console.log(response.data.result[0]) ;
                context.login(response.data.result[0]) ;
                history.push('/')
            }
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
        <div class="login-wrap">
        <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="sign-in" onClick={()=>{setHidden("hidden")}}/><label for="tab-1" class="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" class="sign-up" onClick={()=>{setHidden("hidden")}} /><label for="tab-2" class="tab">Sign Up</label>
            <div class="login-form">
            <div id={hidden}>Remember Better With Us. </div>
                <div class="sign-in-htm">
                    <div class="group">
                        <label for="user" class="label">Username</label>
                        <input id="user" type="text" class="input" onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div class="group">
                        <label for="pass" class="label">Password</label>
                        <input id="pass" type="password" class="input" data-type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div class="group">
                        <input type="submit" class="button" value="Sign In" onClick={loginUser}/>
                    </div>
                    {!isLoggedIn && (

                        <div class="error-msg">{loginStatus}</div>
                      
                    )}
                </div>
                <div class="sign-up-htm">
                    <div class="group">
                        <label for="user" class="label">Username</label>
                        <input id="user" type="text" class="input"  onChange={(e)=>{setUsernameReg(e.target.value)}}/>
                    </div>
                    <div class="group">
                        <label for="pass" class="label">Password</label>
                        <input id="pass" type="password" class="input" data-type="password"  onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                    </div>
                    <div class="group">
                        <label for="pass" class="label">Repeat Password</label>
                        <input id="pass" type="password" class="input" data-type="password" onChange={(e)=>{setPasswordReg1(e.target.value)}}/>
                    </div>
                    <div class="group">
                        <input type="submit" class="button" value="Sign Up" onClick={register}/>
                    </div>
                    {!isLoggedIn && (

                        <div class="error-msg">{errors}</div>
                      
                    )}
                    <div class="hr"></div>

                </div>
            </div>
        </div>
    </div>
        
            
        
            
        </div>
        
        
    ) ;
}
//<h2 className="currname"> {loginStatus} </h2>
export default LoginPage