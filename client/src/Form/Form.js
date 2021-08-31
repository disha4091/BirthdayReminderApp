import React from 'react'
import {useState, useEffect} from "react" ;
import Axios from "axios" ;
import './Form.css' ;
import Dates from '../Validations' ;

const Form = () => {
    const [Name,setName] = useState("") ;
    const [DOB, setDOB] = useState("") ;
    const [month, setMonth] = useState("") ;
    const [Event, setEvent] = useState("") ;
    const [Description, setDescription] = useState("") ;
    const [DOBList, setDOBList] = useState([]) ;
    const [errors, setErrors] = useState("") ;
 
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get').then((response) =>{
          setDOBList(response.data) ;
        })
      },[DOBList]) ;
    
   
    const submitInfo = () =>{

        if(DOB<0 || DOB>Dates[month-1]){
          setErrors("Date Invalid!") ;
        }
        else{;
          Axios.post('http://localhost:3001/api/insert', {
            Name:Name,DOB:DOB,month:month,Event:Event, Description: Description
          }).then((response)=>{
          if(response.data.message){
            setErrors(response.data.message) ;
          }
          else{
            alert("New Event added" ) ;
          }
        })
       
        setDOBList([...DOBList,{Name: Name , DOB: DOB , month:month , Event: Event, Description: Description}]) ;
        setName("") ; setDOB("") ; setMonth("") ; setEvent("") ; setDescription("") ;
        }
        

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
            <label>Month </label>
            <select class="form-control" id="exampleFormControlSelect1" value={month}  onChange={(e)=>{setMonth(e.target.value)}} default=" " >
            <option selected> </option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option> <option value="6">June</option>
            <option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option> <option value="12">December</option>
          </select>
            <br></br>
            <br></br>  
            <label>Date </label>
            <input type="number" value={DOB} min="0" max="31" onChange={(e)=>{setDOB(e.target.value)}} />
            <br></br>
            <br></br> 
            
            <p>{errors}</p>
            <button type="button" class="btn btn-info" onClick={submitInfo}>➕</button>

        </div>
    )
}

export default Form
