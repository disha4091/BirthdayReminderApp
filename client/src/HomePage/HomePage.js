import React from 'react'
import "./HomePage.css" ;
import { Carousel } from 'react-responsive-carousel';
import image from "./image1.PNG" ; 
import update from "./update.png" ; 
import remind from "./remind.png" ; 
import calendar from "./calendar.png" ; 
import greenlogo from "./greenLogo.png" ; 
const HomePage = () => {
  
    return (
     <div className="main">
        <div className="first">
          <div className="firstR">Get all your events at one place.</div>
        </div>
        <h1 className="heading">We help you to ...</h1>
        <div class="card-group">
          <div class="card mb-4 border-0" id="cards">
            <img src={remind} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">Add Events</h5>
              <p class="card-text">Take a note of upcoming events. Anywhere. Anytime.</p>
            </div>
          </div>
          <div class="card mb-4 border-0">
            <img src={calendar} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">Get reminded</h5>
              <p class="card-text">Gives you details of all the events today.</p>
            </div>
          </div>
          <div class="card mb-4 border-0">
            <img src={update} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">Update dates</h5>
              <p class="card-text">Don't worry about adding a wrong date to your event. Just update snd carry on.</p>
            </div>
          </div>
        </div>
        <div class="card mb-3 border-0"  id="third">
  <div class="row g-0">
    <div class="col-md-8">
    <div class="card-body">
    <h1 class="card-title">Explore!</h1>
    <h2 class="card-text">You can add all kinds of events. Including meetings, birthdays, anniversaries and many more!</h2>
  </div>
    </div>
    <div class="col-md-4">
    <img src={greenlogo} class="img-fluid rounded-start" alt="..."/>
      
    </div>
  </div>
</div>
      <div className="fourth">
        <h1>Get started!</h1>
        <p>Login/signup and add new events!</p>
      </div>
      
     </div>
    )
}

export default HomePage
