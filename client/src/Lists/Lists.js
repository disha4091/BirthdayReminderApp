import React from "react" ;
import Months from "../Months" ;
import {useState, useEffect} from "react" ;
import Axios from "axios" ;
import './Lists.css' ;
import Dates from '../Validations' ;

const Lists = () => {
    const [Name,setName] = useState("") ;
    const [DOB, setDOB] = useState("") ;
    const [month, setMonth] = useState("") ;
    const [Event, setEvent] = useState("") ;
    const [Description, setDescription] = useState("") ;
    const [List, setList] = useState([]) ;
    const [newDOB , setNewDOB] = useState("") ;
    const [newMonth , setNewMonth] = useState("") ;
    const [errors, setErrors]= useState("") ;
    useEffect(()=>{      
        Axios.get('http://localhost:3001/api/get').then((response) =>{
          setList(response.data) ;
        })
      },[List]) ;
    
    const deleteEvent = (Name1) => {
      if(window.confirm(`Are you sure you want to delete ${Name1}` )){
        Axios.delete(`http://localhost:3001/api/delete/${Name1}`) ;
        setList([...List,{Name: Name , DOB: DOB , month:month, Event: Event, Description: Description}]) ;
      }
    }
    function message(){
      alert(errors) ;
    }
    const updateEvent = (Name2) => {
      if(newDOB<0 || newDOB>Dates[newMonth-1]){
         alert("Date Invalid!") ;
       }
        else{
          Axios.put('http://localhost:3001/api/update', {Name:Name2,DOB:newDOB,month:newMonth,
           Event:Event, Description: Description}).then((response)=>{
            if(response.data.message){
              setList([...List,{Name: Name , DOB: DOB , month:month , Event: Event, Description: Description}]) ;
              alert(response.data.message) ;
              
            }
           }) ;              
          
          setNewDOB("") ; setNewMonth("") ;
        }
        
      }
      function getMonth( num){
        var num1 = "1" ;
          return Months[num-1] ;
      }
      
    return (
        <>
       
        <div className="container" id="lists">
        <div className="Heading">
        <h2>Events!</h2>
        </div>

        {(List.length > 0) ? 
          <div className="card-group">
          {List.map((val)=>{
          return (                      
            <div >
            <div className="card"  id="card" >
            <h1 class="card-title">{val.Event}</h1>

            <h2 class="card-subtitle mb-2 text-muted" id="left">{val.Name}</h2>
            <h3 class="card-subtitle mb-2 text-muted" id="right">{val.DOB} {getMonth(val.month)}</h3>
            <h3 class="card-text">{val.Description}</h3>
            
            <br></br>
           <div class="input-grp">
           <select class="form-control" placeholder="Date" id="exampleFormControlSelect1" onChange={(e)=>{setNewMonth(e.target.value)}} default=" " >
           <option selected>Month</option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option> <option value="6">June</option>
            <option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option> <option value="12">December</option>
          </select>
          <input type="number" placeholder="Date" min="0" max="31" id="monthinp" onChange={(e)=>{setNewDOB(e.target.value)}} />

          <br></br>
            
           </div>
            
            <br></br>
            <div class="btn-group">
            <button id="update" className="btn btn-primary btn-md" onClick={() => updateEvent(val.Name)}>Update☑</button> 
            <button className="btn btn-danger btn-md" id="button" onClick={() => {deleteEvent(val.Name)}}>Delete🗑</button>
            </div>
            <p>{errors}</p>
            </div>
            </div>
           
    
            
            )
        })}
      </div>:
      <div  className="emptyList">
        <p>You do not have any events! Click to add <a href="/form">here</a></p>
      </div>
        }
  
        </div>
        </>
    )
}

export default Lists

