import React, { Component } from 'react'
import Sidebar from "./components/Sidebar";
import Countdown from "./components/countdown";
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import { db } from './config/firebase';
import { collection } from "firebase/firestore";
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
function UserDashboard() {
    const { authUserData, setauthUserData ,update, setUpdate } = useContext(UserContext);

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
        }
    ]


})
  

    setUpdate(update+1)
 
}

const print = () => console.log(authUserData);





  return (
    <div>


              



                <div className="p-4 sm:ml-64 ">

                    <div className="p-4  flex flex-col space-y-10 ">


                        
{
    authUserData.isActive? <div className="p-4 border-2 border-transparent w-3/2 rounded-lg drop-shadow-lg	dark:drop-shadow-none text-center	">

    <span className="text-3xl font-helvetica">Your Time Has Started</span>
    <button onClick={print} className=" bg-emerald-800 text-white font-bold py-2 px-4 rounded-full">
                                Refresh

                            </button>
    </div>:<div className="p-4 border-2 drop-shadow-lg	dark:drop-shadow-none w-3/2 rounded-lg  text-center	">

                            <span className="text-4xl font-bold font-helvetica">Start Your time </span>
                            <button onClick={updateActiveStatus} className=" bg-emerald-800 text-white font-bold py-2 px-4 rounded-full">
                                Start
                            </button>

                            <button onClick={print} className=" bg-emerald-800 text-white font-bold py-2 px-4 rounded-full">
                                Refresh

                            </button>

                        </div>
}



                        <div className="p-4 border-2 border-transparent w-3/2 rounded-lg drop-shadow-lg	dark:drop-shadow-none text-center	">

                            <span className="text-3xl font-helvetica">Current subscription plan:</span>
                            <span className="text-3xl font-helvetica text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-amber-900 to-amber-500 dark:from-amber-100 dark:via-amber-50 dark:to-amber-500 "> <br/> <em> Premium </em> </span>

                            <div className="row">
                                <div className="col-md-5">
                                    <div className="book_room ">
                                        <h1 className="font-bold text-xl font-helvetica"><br/><br/>Book a Room Online</h1>
                                        <form className="book_now  ">
                                            <div className="row ">
                                                <div className="col-md-12 ">
                                                    <span><br/>Arrival: </span>

                                                        <input class=" block  p-4 drop-shadow-lg pl-20 dark:drop-shadow-none w-full text-center text-gray-900  border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="00:00:PM" type="time" name="dd/mm/yyyy"/>
                                                </div>
                                                <div className="col-md-12">
                                                    <span><br/>Hours: </span>
                                                        <input class="block  p-4 text-gray-900  text-center pl-8 w-full border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0"
                                                               type="number" name="dd/mm/yyyy"/>
                                                </div>
                                                <div className="pt-5 col-md-12">
                                                    <button
                                                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                     <span
                                                       className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                       Book Now
                                                     </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

  )
}

export default UserDashboard