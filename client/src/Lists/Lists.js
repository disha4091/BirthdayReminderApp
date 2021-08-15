import React from "react" ;

import {useState, useEffect} from "react" ;
import Axios from "axios" ;
import '../Styles.css' ;


const Lists = () => {
    const [Name,setName] = useState("") ;
    const [DOB, setDOB] = useState("") ;
    const [month, setMonth] = useState("") ;
    const [Event, setEvent] = useState("") ;
    const [Description, setDescription] = useState("") ;
    const [List, setList] = useState([]) ;
    const [newDOB , setNewDOB] = useState("") ;
    const [newMonth , setNewMonth] = useState("") ;

    useEffect(()=>{
      
        Axios.get('http://localhost:3001/api/get').then((response) =>{
          setList(response.data) ;
        })
      },[List]) ;
    
      
    
      const deleteEvent = (Name1) => {
        Axios.delete(`http://localhost:3001/api/delete/${Name1}`) ;
        alert(`Are you sure you want to delete ${Name1}` ) ;        
        setList([...List,{Name: Name , DOB: DOB , month:month, Event: Event, Description: Description}]) ;

      }
    
      const updateEvent = (Name2) => {
        Axios.put('http://localhost:3001/api/update', {Name:Name2,DOB:newDOB,month:newMonth, Event:Event, Description: Description}) ;              
        setList([...List,{Name: Name , DOB: DOB , month:month , Event: Event, Description: Description}]) ;
        setNewDOB("") ; setNewMonth("") ;
        
      }
    return (
        <>
       
        <div className="Container">
        <div className="Heading">
        <h2>🎂🎈Events!🎂🎈</h2>
        </div>
        <div className="grid-container">
        {List.map((val)=>{
            return (
              <div class="card">
              <div class="ui card">
  <div class="content">
    <div class="header">Project Timeline</div>
  </div>
  <div class="content">
    <h4 class="ui sub header">Activity</h4>
    <div class="ui small feed">
      <div class="event">
        <div class="content">
          <div class="summary">
             <a>Elliot Fu</a> added <a>Jenny Hess</a> to the project
          </div>
        </div>
      </div>
      <div class="event">
        <div class="content">
          <div class="summary">
             <a>Stevie Feliciano</a> was added as an <a>Administrator</a>
          </div>
        </div>
      </div>
      <div class="event">
        <div class="content">
          <div class="summary">
             <a>Helen Troy</a> added two pictures
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="extra content">
    <button class="ui button">Join Project</button>
  </div>
</div>
              <div class="card-body">
              <h4 class="card-title">{val.Event}</h4>
              <h5 class="card-subtitle mb-2 text-muted">{val.Name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{val.DOB}/{val.month}</h6>
              <p class="card-text">{val.Description}</p>
              <button classname="buttonList" onClick={() => {deleteEvent(val.Name)}}>Delete🗑</button>
              <br></br>
              <input placeholder="Enter date! " type="text" onChange={(e)=>{
                setNewDOB(e.target.value)
              }}></input>
              <input placeholder="Enter month! " type="text" onChange={(e)=>{
                setNewMonth(e.target.value)
              }}></input>
              <button classname="buttonList" onClick={() => updateEvent(val.Name)}>Update☑</button>
              </div>
              </div>)
          })}
        </div>
        </div>
        
        </>
    )
}

export default Lists

