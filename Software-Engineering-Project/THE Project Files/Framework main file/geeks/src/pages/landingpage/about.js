import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../components/navbar';
import thi from "./any.module.css";
import { useEffect } from 'react';

import {Telephone} from "react-bootstrap-icons";
import{Envelope} from "react-bootstrap-icons";
import{Geo } from "react-bootstrap-icons";


function About(){
    return(
        <div>
            <Navbar></Navbar>
            {/* <h1>About us</h1> */}
            <header>
    {/* <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav> */}
  </header>

  <main className="p-3 mb-2 bg-info text-dark">
       <h1>About Geeks Hub</h1> 
      <p>
        Geeks Hub is a co-working space established in June 2019. Our aim is to provide a quiet and suitable place for students<br></br>
         to study and work, as well as teams to collaborate and work on their projects<br></br>
          in a professional environment.
      </p>
      <h2>Our Facilities</h2>
      <ul>
        <li>High-speed Wi-Fi</li>
        <li>3D Printing</li>
        <li>Meeting rooms</li>
        <li>Private offices</li>
        <li>Kitchen with free drinks</li>
        <li>Tools you may need in projects</li>
        <li>Lounge area with comfortable seating</li>
      </ul>
      <h2>Our Mission</h2>
      <p>
        Our mission is to provide an environment that inspires and motivates our community to create, innovate and grow.<br></br>
         We strive to foster a culture of collaboration, creativity and productivity, where individuals and teams can achieve their goals and reach their full potential.
      </p>
      <p>
        If you have any questions or would like to schedule a tour of our co-working space, please don't hesitate to contact us.
      </p>
    </main>

  <footer>
    <p>&copy; 2023 Geeks Hub. All Rights Reserved.</p>
  </footer>
        </div>

    )
}
export default About;