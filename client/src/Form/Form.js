import React from 'react'
import {useState, useEffect} from "react" ;
import Axios from "axios" ;
import './Form.css' ;

const Form = () => {
    const [Name,setName] = useState("") ;
    const [DOB, setDOB] = useState("") ;
    const [month, setMonth] = useState("") ;
    const [Event, setEvent] = useState("") ;
    const [Description, setDescription] = useState("") ;
    const [DOBList, setDOBList] = useState([]) ;
 
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get').then((response) =>{
          setDOBList(response.data) ;
        })
      },[DOBList]) ;
    
    const submitInfo = () =>{
       
        Axios.post('http://localhost:3001/api/insert', {
            Name:Name,DOB:DOB,month:month,Event:Event, Description: Description
        }).then(alert("New Event added!"))
       
        setDOBList([...DOBList,{Name: Name , DOB: DOB , month:month , Event: Event, Description: Description}]) ;
        setName("") ; setDOB("") ; setMonth("") ; setEvent("") ; setDescription("") ;

      };
    return (
        <div className="Form">
            <h1>Add new event here !</h1>
            <label>Event</label>
            <input type="text" value={Event}  onChange={(e)=>{setEvent(e.target.value)}} />
            <br></br>
            <br></br>
            <label>Name</label>
            <input type="text" value={Name}  onChange={(e)=>{setName(e.target.value)}} />
            <br></br>
            <br></br>
            <label>Description</label>
            <input type="text" value={Description}  onChange={(e)=>{setDescription(e.target.value)}} />
            <br></br>
            <br></br>
            <label>Date </label>
            <input type="number"  value={DOB} min="0" max="31" onChange={(e)=>{setDOB(e.target.value)}} />
            <br></br>
            <br></br> 
            <label>Month </label>
            <input type="number"value={month} min="0" max="12" onChange={(e)=>{setMonth(e.target.value)}} />
            <br></br>
            <br></br>  
            <button type="button" class="btn btn-info" onClick={submitInfo}>➕</button>
            
        </div>
    )
}

export default Form
