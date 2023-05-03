import React from 'react'
import { useState, useEffect , useContext} from "react";
import {  Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthContext } from '../context/Auth';


function Sidebar() {
   const [navbarOpen, setNavbarOpen] = useState(false);
   const [mounted, setMounted] = useState(false);
   const { user, setUser } = useContext(AuthContext);
     const navigate = useNavigate()


  // When mounted on client, now we can show the UI
   useEffect(() => setMounted(true), []);


   const handleLogout = async () => {
      try {
         await signOut(auth);
         navigate('/');
         setUser(null);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
      <div>

         <nav>



<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 justify-items-center " aria-label="Sidebar">
   <div className="h-full px-3 py-4  bg-gray-50 dark:bg-gray-800 ">
      <ul className="space-y-2 font-medium content-center   mt-5">
         <li>
            <Link to='/home' className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3">Dashboard</span>
            </Link>
         </li>
        
         <li>
            <Link to='/home/reservations' className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

               <svg aria-hidden="true" 
               className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
               fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path 
               fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" 
               clip-rule="evenodd"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Reservation History</span>
            </Link>
         </li>
         <li>
            <Link to='/home/subscribtions' className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Subscribtions</span>
            </Link>
         </li>
         <div>
         <hr className=' mt-10'/>

         </div>

         <li  className="pt-6">
            <Link to='/home/settings' className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Account Setting</span>
            </Link>
         </li>
        
         <li>
            <button onClick={handleLogout} className="flex items-center p-4 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            
               <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap ">Sign out</span>
            </button>
         </li>
        <li className="pt-6">
         <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-full h-10  text-center justify-center  p-3 ml-5 mr-0 bg-gray-200 rounded md:ml-0 md:mr-5 dark:bg-gray-700"
            
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="h-4   ml-24 text-gray-800 dark:text-gray-200 "
              >
               
              </svg>
            )}
          </button>
          </li>
      </ul>
   </div>
</aside>
</nav>



      </div>
      <Outlet />
      </div>
  )
}
export default Sidebar;