import React from "react" ;
import {Redirect} from 'react-router-dom' ;

import {useState, useEffect} from "react" ;
import Axios from "axios" ;
import '../Styles.css' ;


const Lists = (authorized) => {
  if(!authorized){
    return <Redirect to="/"/>
  }

    const [Name,setName] = useState("") ;
    const [DOB, setDOB] = useState("") ;
    const [month, setMonth] = useState("") ;
    const [DOBList, setDOBList] = useState([]) ;
    const [newDOB , setNewDOB] = useState("") ;
    const [newMonth , setNewMonth] = useState("") ;

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get').then((response) =>{
          setDOBList(response.data) ;
        })
      }) ;
    
      
    
      const deleteDOB = (Name1) => {
        Axios.delete(`http://localhost:3001/api/delete/${Name1}`) ;
        alert(`Are you sure you want to delete ${Name1}` ) ;        
        setDOBList([...DOBList,{Name: Name , DOB: DOB , month:month}]) ;

      }
    
      const updateDOB = (Name2) => {
        Axios.put('http://localhost:3001/api/update', {Name:Name2,DOB:newDOB,month:newMonth}) ;
                
        setDOBList([...DOBList,{Name: Name , DOB: DOB , month:month}]) ;
        setNewDOB("") ; setNewMonth("") ;
        
      }
    return (
        <>
       
        <div className="Container">
        <div className="Heading">
        <h2>🎂🎈Birthdays!🎂🎈</h2>
        </div>
        <div className="grid-container">
        {DOBList.map((val)=>{
            return (<div key= {val.id} className="grid-item">
              <h2>{val.Name}</h2>
              <p>{val.DOB}/{val.month}</p>
              <button classname="buttonList" onClick={() => {deleteDOB(val.Name)}}>Delete🗑</button>
              <br></br>
              <input placeholder="Enter date! " type="text" onChange={(e)=>{
                setNewDOB(e.target.value)
              }}></input>
              <input placeholder="Enter month! " type="text" onChange={(e)=>{
                setNewMonth(e.target.value)
              }}></input>
              <button classname="buttonList" onClick={() => updateDOB(val.Name)}>Update☑</button>
              </div>)
          })}
        </div>
        </div>
        
        </>
    )
}

export default Lists

