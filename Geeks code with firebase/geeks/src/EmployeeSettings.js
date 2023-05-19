import React from 'react'
import { useState, useEffect ,useContext } from "react";
import { auth } from './config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';
import {  db } from './config/firebase';
import { getDoc  } from 'firebase/firestore'
import { doc } from "firebase/firestore";
import { UserContext } from './context/UserContext';
import { updateDoc } from "firebase/firestore";
function EmployeeSettings() {
  const [mounted, setMounted] = useState(false);
  // Auth context for user state
  const { user, setUser } = useContext(AuthContext);
 
   // User context for user state
   const { authUserData, setauthUserData, update, setUpdate } =
     useContext(UserContext);
 
 
 // name 
 const [Name, setName] = useState(authUserData.Name);
 // faculty
 const [Faculty, setFaculty] = useState(authUserData.Faculty);
 // phone number
 const [PhoneNumber, setPhoneNumber] = useState(authUserData.PhoneNumber);
 // email
 const [Email, setEmail] = useState(authUserData.Email);
 // password
 const [Password, setPassword] = useState(authUserData.Password);
 
  
  
  
  // navigate to other pages
     const navigate = useNavigate()
 
 
    const handleSubmit = async () => {
     // upadt auth user data in firestore
     const docRef = doc(db, "users", authUserData.id);
     try {
       await updateDoc(docRef, {
         Name: Name,
         Faculty: Faculty,
         PhoneNumber: PhoneNumber,
         Email: Email,
         Password: Password,
       });
       console.log("Document successfully updated!");
       setUpdate(update+1);
       
     } catch (e) {
       console.error("Error updating document: ", e);
     }
   
   };
       // upadt auth user data in firestore
  
  
    // get the auth user data from firestore 
   
 
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
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
        <input type="text" id="first_name" onChange={(e) => setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Update  Name" required/>
    </div>
   
    <div>
        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Faculty</label>
        <input type="text" id="company"  onChange={(e) => setFaculty(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Update Faculty" required/>
    </div>  
    <div>
        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
        <input type="tel" placeholder={PhoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required/>
    </div>
   
    
</div>
<div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
    <input type="email"  disabled={true}  value={Email} onChange={(e) => setEmail(e.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
</div> 
<div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input type="text" id="password" disabled={true} value={Password} onChange={(e) => setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
</div> 


<button type="submit" onClick={handleSubmit}  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button>
</form>
 </div>
 
 

  

</div>
</div>
    </div>
  )
}

export default EmployeeSettings