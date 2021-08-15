import React from 'react'
import { Route, Redirect } from "react-router-dom" ;
const ProtectedRoutes = ({
    component: Component,
    isAuthenticated: isAuthenticated, 
    logout:logout,
     ...rest}) => {
    return (
        <Route 
        {...rest} 
        render={(props) =>{
            if (isAuthenticated){
                return <Component/> ;
            }
            else{
                return (
                    <Redirect to={{pathname: "/", state: {from: props.location}}}/>
     ); }
        }}/>
    )
}

export default ProtectedRoutes
