import React,{useContext} from 'react'
import { AuthContext, AuthProvider } from "./auth";
const Profile = () => {

    const {user} = useContext(AuthProvider) ;

    return (
        <div>
            <h1>{user.Username}</h1>
        </div>
    )
}

export default Profile
