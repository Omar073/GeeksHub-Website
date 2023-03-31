import React from 'react'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

 function Sidebar() {
    const [navbarOpen, setNavbarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  return (
    <div>



<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 justify-items-center " aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
      <ul className="space-y-2 font-medium content-center   mt-5">
         <li>
            <a href="#" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3">Active users</span>
            </a>
         </li>
        
         <li>
            <a href="Subscribers_admin" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

               <svg aria-hidden="true" 
               className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
               fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path 
               fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" 
               clip-rule="evenodd"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Subscribers</span>
            </a>
         </li>
         
         <div>
         <hr className=' mt-10'/>

         </div>

         <li  className="pt-6">
            <a href="Settings" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Account Settings</span>
            </a>
         </li>
        
         <li>
            <a href="/" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ">
               <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap ">Sign out</span>
            </a>
         </li>
        <li className="pt-6">
         <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-full h-10  text-center justify-center  p-3 ml-5 mr-0 bg-gray-200 rounded md:ml-0 md:mr-5 dark:bg-gray-700"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="h-4   ml-24 text-gray-800 dark:text-gray-200 "
              >
                {theme === "dark" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                   
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <svg className="svg-icon " viewBox="0 0 20 20">
                    <path
                      fill="none"
                      d="M10.544 8.717l1.166-.855 1.166.855-.467-1.399 1.012-.778h-1.244l-.467-1.243-.466 1.244H10l1.011.778-.467 1.398zm5.442.855l-.467 1.244h-1.244l1.011.777-.467 1.4 1.167-.855 1.165.855-.466-1.4 1.011-.777h-1.244l-.466-1.244zm-8.979-3.02c0-2.259.795-4.33 2.117-5.955A9.418 9.418 0 00.594 9.98c0 5.207 4.211 9.426 9.406 9.426 2.94 0 5.972-1.354 7.696-3.472-.289.026-.987.044-1.283.044-5.194.001-9.406-4.219-9.406-9.426M10 18.55c-4.715 0-8.551-3.845-8.551-8.57 0-3.783 2.407-6.999 5.842-8.131a10.32 10.32 0 00-1.139 4.703c0 5.368 4.125 9.788 9.365 10.245A9.733 9.733 0 0110 18.55m9.406-16.246h-1.71l-.642-1.71-.642 1.71h-1.71l1.39 1.069-.642 1.924 1.604-1.176 1.604 1.176-.642-1.924 1.39-1.069z"
                    />
                  </svg>
                )}
              </svg>
            )}
          </button>
          </li>
      </ul>
   </div>
</aside>




      </div>
  )
}
export default Sidebar;