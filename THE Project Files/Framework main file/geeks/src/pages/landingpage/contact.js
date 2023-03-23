import React from 'react';
import thi from "./any.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import Navbar from '../components/navbar';

import {Telephone} from "react-bootstrap-icons";
import{Envelope} from "react-bootstrap-icons";
import{Geo } from "react-bootstrap-icons";
function Contact(){
    return(
        <div>
            <Navbar></Navbar>
           
            
             {/* main row */ }
             <div class="row shadow-lg p-3 mb-5 bg-body rounded">
                {/* main col */ }
                    <div class="col-4 " >
                       <h3 class={thi.col1}>
                        <h2 class={thi.cont}   >  contact information</h2>
                                
                       <div class="row">
                            {/* telephone col */ }
                        <div class="col-2">
                           <h4 class={thi.Tele}><Telephone/></h4> 
                        </div>
                      
                               
                        <div class="col-3">
                           <h5 class={thi.Tele2}>+01002230333</h5> 
                        </div>
                        </div>
                       </h3>
                        
                       
                     </div>
            
                     
                   
                <div class="col-sm-3">
                  <h2 class={thi.col2} >what</h2>
                </div>
               </div>

                          </div>
          
  

    )
}
export default Contact;