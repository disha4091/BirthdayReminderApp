import React from "react" ;
import LoginPage from "./LoginPage/LoginPage";
import Navbar from "./Navbar/Navbar";

function App() {
  var today = new Date(),

  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <>
   
    <Navbar/>
    
    </>
    
   );
}

export default App;
