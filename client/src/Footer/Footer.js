import React from 'react'
import './Footer.css' ;
import {SocialMediaIconsReact} from 'social-media-icons-react';
const Footer = () => {
    return (
        <footer class="mainfooter" role="contentinfo">
  <div class="footer-middle">
  <div class="container">
    <div class="row">
      <div class="col-md-3 col-sm-6">
        <div class="footer-pad">
          <h4>About Developer</h4>
          <ul class="list-unstyled">
            <li>Disha Chavan</li>
            <li>Student at Pune Institute of Computer Technology</li>
          </ul>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">

        <div class="footer-pad">
          <h4>Contact Us</h4>
          <ul class="list-unstyled">
            <li><a href="https://forms.gle/RzmoC5podjFi5HpV7">Give your message here</a></li>
            <li>Write at <a href="https://mail.google.com/mail/u/0/#inbox">disha4091@gmail.com</a></li>
            <li>Phone +919762987501</li>
          </ul>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        
      </div>
    	<div class="col-md-3">
    		<h4>Follow Us</h4>
            <ul class="social-network social-circle">
            <SocialMediaIconsReact className="sicons" borderColor="rgba(0,0,0,0.25)" icon="github" iconColor="rgba(255,255,255,1)" backgroundColor="black" url="https://github.com/disha4091" size="45" /> .    
            <SocialMediaIconsReact className="sicons" borderColor="rgba(0,0,0,0.25)" icon="linkedin" iconColor="rgba(255,255,255,1)" backgroundColor="black" url="https://www.linkedin.com/in/disha-chavan-999247200" size="45" /> .
            <SocialMediaIconsReact className="sicons" borderColor="rgba(0,0,0,0.25)" icon="instagram" iconColor="rgba(255,255,255,1)" backgroundColor="black" url="https://www.instagram.com/disha_827" size="45" />

            </ul>				
		</div>
    </div>
	<div class="row">
		<div class="col-md-12 copy">
			<p class="text-center">&copy; Copyright 2018 - Company Name.  All rights reserved.</p>
		</div>
	</div>


  </div>
  </div>
</footer>
    )
}

export default Footer
