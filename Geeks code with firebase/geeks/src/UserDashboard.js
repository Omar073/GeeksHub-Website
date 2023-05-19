import React, { Component } from 'react'
import Sidebar from "./components/Sidebar";
import Countdown from "./components/countdown";
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import { db } from './config/firebase';
import { collection } from "firebase/firestore";
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
function UserDashboard() {
    const { authUserData, setauthUserData ,update, setUpdate } = useContext(UserContext);
    const [events , setEvents] = useState([])


    // use effect to get all of the current events 
    useEffect(() => {

        const getEvents = async () => {
            const eventsCol = collection(db, "events");
            const eventsSnapshot = await getDocs(eventsCol);
            const eventsList = eventsSnapshot.docs.map((doc) => doc.data());
            setEvents(eventsList);
        }
        getEvents();
    }, [])



   

   const  updateActiveStatus  = async () => {
     await updateDoc(doc(db, "users", authUserData.id), {
         isActive: true,

   });

    await updateDoc(doc(db, "users", authUserData.id), {
    Reservations:[
        ...authUserData.Reservations,
        {
            id: authUserData.Reservations.length + 1,
            startTimeHour: new Date().getHours() ,
            startTimeMin: new Date().getMinutes() ,
            date : new Date().toLocaleDateString(),
            isReported: false,
            employeeEmail: '',
        }
    ]


})
  

    setUpdate(update+1)
 
}

const print = () => console.log(authUserData);





  return (
    <div>


              



                <div className="p-4 sm:ml-64 ">

                    <div className="p-4  flex flex-col gap-5 space-y-10 ">

                        <h1 className=' font-bold text-3xl sm:text-center lg:text-left text-black animate-[wiggle_1s_ease-in-out_infinite]'>Welcome , {authUserData.Name}</h1>


                        
{
   authUserData.isBlocked ? <div className="w-full lg:h-64  items-center grid grid-cols-1   shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
   <div className="flex items-center mb-4">
    
     <div className="ml-2 ">
       <h2 className="text-2xl font-bold text-[#735672] mb-3">You're Blooked from geeks hub</h2>
       <p className="text-lg text-gray-500"></p>
     </div>
   </div>
   <div className="flex items-center justify-between">
     <div className="text-lg text-gray-500">
    
     </div>
     <div className="flex items-center">
       <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse mr-2"></div>
       <p className="text-lg text-red-500 font-semibold"> Blocked</p>
     </div>
   </div>
 </div> :

    authUserData.isActive? <div className="w-full lg:h-64  items-center grid grid-cols-1   shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
    <div className="flex items-center mb-4">
     
      <div className="ml-2 ">
        <h2 className="text-2xl font-bold text-[#735672] mb-3">You're currently active </h2>
        <p className="text-lg text-gray-500">Hope you are enjoying your time with us</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-lg text-gray-500">
     
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse mr-2"></div>
        <p className="text-lg text-green-500 font-semibold"> Active</p>
      </div>
    </div>
  </div>: <div className="w-full lg:h-64  items-center grid grid-cols-1   shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
        <div className="flex items-center mb-4">
         
          <div className="ml-2 ">
            <h2 className="text-2xl font-bold text-[#735672] mb-3">You're currently not active </h2>
            <p className="text-lg text-gray-500">Click the button and start your time at Geeks Hub</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg text-gray-500">
         <button onClick={updateActiveStatus} className="bg-[#735672]  text-white font-bold py-2 px-4 rounded">
        Start  time
      </button>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse mr-2"></div>
            <p className="text-lg text-red-500 font-semibold">Not Active</p>
          </div>
        </div>
      </div>
}

<h1 className='text-center font-bold text-3xl text-[#735672] animate-bounce'>Join us for our upcoming events and Courses</h1>

<div className='grid grid-cols-3 gap-6'>
   {
        events.map((event) => (
          <a href={event.link} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={event.image} alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
    </div>
</a>
        ))


   }



</div>




















                </div>

            </div>
    </div>

    

  )
}

export default UserDashboard