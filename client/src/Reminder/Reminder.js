import React from 'react' ;
import { useState,useEffect } from 'react' ;
import Axios from 'axios' ;
import './Reminder.css' ;

const Reminder = () => {
    const [DOBList, setDOBList] = useState([]) ;
    var today = new Date(),
    currDate = today.getDate(),
    currMonth = (today.getMonth() + 1) ;
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get').then((response) =>{
          setDOBList(response.data) ;
        })
      },[DOBList]) ;

    function filter_dates(event) {
        return (event.DOB == currDate && event.month == currMonth);
    }

    var tempBDay = DOBList.filter(filter_dates);
    
    /*<div classname="people">
           {DOBList.filter(filter_dates).map(filteredPerson => (
            <li className="person" >
              {filteredPerson.Name}
            </li>))}
           </div>*/

    const CheckBday = () => {
      if(tempBDay.length === 0 ){
        return(<p className="person">No events today!</p>) ;
    }
      else{
        return(
          tempBDay.map((val)=>{
            return (<div key= {val.id} className="person"><div className="left"><h2>{val.Name}</h2><p>{val.Event} <p className="right">{val.Description}</p></p></div></div>);
          })
        ) ;
        
      }
    } ;
    return (
        <section>
        <div className="Reminder">
        <div className="heading1">Today's events!</div>
          <CheckBday/>
          
        </div>
        </section>
    )
}

export default Reminder
