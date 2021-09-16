import React from 'react'
import {useHistory, NavLink} from "react-router-dom";


function Footer() {
    return (
        <div>
            <footer class="bg-light text-center text-lg-start" id="footer">
   
    


    <div class="text-center p-1" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
      
    

      <div class="container pb-0">
        <section class="mb-0">
        <NavLink to="/contactus">
          <a class="floating m-1"  >Contact Us</a>
        </NavLink>

        <NavLink to="/legal">
            <a class="floating m-1" 
            >Legal</a>
        </NavLink>
        <NavLink to="/termsandcondition">
            <a class="floating m-1" 
            >Terms and cnditions</a>
        </NavLink>
        <NavLink to="/about">
            <a class="floating m-1"
            >About Us</a>
         </NavLink>

        </section>
      </div>
      <div>
      © 2021 Copyright:Gotmidi - Midi files
        </div>
    </div>

  </footer>
        </div>
    )
}

export default Footer
