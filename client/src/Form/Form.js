import React from 'react'
import {useState, useEffect} from "react" ;
import Axios from "axios" ;
import './Form.css' ;

const Form = () => {
    const [Name,setName] = useState("") ;
    const [DOB, setDOB] = useState("") ;
    const [month, setMonth] = useState("") ;
    const [DOBList, setDOBList] = useState([]) ;
 
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get').then((response) =>{
          setDOBList(response.data) ;
        })
      },[]) ;
    
    const submitInfo = () =>{
       
        Axios.post('http://localhost:3001/api/insert', {
            Name:Name,DOB:DOB,month:month,
        }).then(alert("New Birthday added!"))
       
        setDOBList([...DOBList,{Name: Name , DOB: DOB , month:month}]) ;
        setName("") ; setDOB("") ; setMonth("") ;

      };
    return (
        <div className="Form">
            <h1>Add new person here !</h1>
            
            <label>Name</label>
            <input type="text" value={Name}  onChange={(e)=>{setName(e.target.value)}} />
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
