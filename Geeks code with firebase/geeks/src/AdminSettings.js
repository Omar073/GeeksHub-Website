import React from 'react'
import { useState, useEffect ,useContext } from "react";
import { Link, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import {  db } from './config/firebase';
import { getDoc  } from 'firebase/firestore'
import { doc } from "firebase/firestore";


function  AdminSettings () {
 const [mounted, setMounted] = useState(false);
 // Auth context for user state
 const { user, setUser } = useContext(AuthContext);

 // data for the authourized user   
    const [data , setData] = useState({})
 
 
 
 // navigate to other pages
    const navigate = useNavigate()
 
 
   // get the auth user data from firestore 
   useEffect(() => {
     const getUser = async () => {
       const userDocRef = doc(db, "users", auth.currentUser.uid);
       const userDocSnap = await getDoc(userDocRef);
       if (userDocSnap.exists()) {
         setData(userDocSnap.data());
         console.log('User document exists');
         // do something with the user document
       } else {
         console.log('User document does not exist'); 
       }
     }
 
     if (auth.currentUser) {
       getUser();
     }
   }, []);
 

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
 
    return (
      <div>
        <div className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

    <div className="grid grid-cols-1 gap-4 mb-4 p-4">
        <div className='text-2xl  font-mono text-black-400 dark:text-white-500'>Profile Settings</div>
        <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" value={data.FirstName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" id="last_name" value={data.LastName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
        </div>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Faculty</label>
            <input type="text" id="company" value={data.Faculty} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required/>
        </div>  
        <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input type="tel" id="phone" value={data.PhoneNumber} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
        </div>
       
        
    </div>
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" value={data.Email} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
    </div> 
    <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
    </div> 
    <div class="mb-6">
        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
    </div> 
    <div class="flex items-start mb-6">
    <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer" />
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"   > Dark Mode</span>
</label>
    </div>
    <button type="submit"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button>
</form>
     </div>
     
     
    
      
    
   </div>
</div>
        </div>
    )
    }
    
    export default AdminSettings;
