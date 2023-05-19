import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { Transition } from "@headlessui/react";


import { Fragment } from "react";




function Subscription() {

   //this is the user context that is used to get the auth user data
   const { authUserData, setauthUserData, update, setUpdate } =
   useContext(UserContext);
   const [subscriptionType, setSubscriptionType] = useState("basic");



   // this for the user to request for a sub
   const handleSubRequest = async () => {
      try {
          await updateDoc(doc(db, "users", authUserData.id), {
              subRequest: true,
          });
          setUpdate(update + 1);
      } catch (error) {

        console.log(error);

      }
  };


  return (
    
    <div className="sm:ml-64">
      {authUserData.isSub ? (
      

      <div className="w-full lg:h-64  items-center grid grid-cols-1 bg-white shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
      <div className="flex items-center mb-4">
       
        <div className="ml-2">
          <h2 className="text-2xl font-semibold text-gray-900">You are subscribed</h2>
          <p className="text-lg text-gray-500">Your remaning hours {authUserData.RemaningHours}</p>
          <p className="text-lg text-gray-500">Your reservations number {authUserData.Reservations.length}</p>

          
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
        <span className="font-semibold">Happy to serve you at geeks hub</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse mr-2"></div>
          <p className="text-lg text-yellow-500 font-semibold">Subscribed</p>
        </div>
      </div>
    </div>
      ) : authUserData.subRequest? (
        <div className="w-full lg:h-64  items-center grid grid-cols-1 bg-white shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
  <div className="flex items-center mb-4">
   
    <div className="ml-2">
      <h2 className="text-2xl font-semibold text-gray-900">Request Pending</h2>
      <p className="text-lg text-gray-500">Your request is being processed go to the table to be granted</p>
    </div>
  </div>
  <div className="flex items-center justify-between">
    <div className="text-sm text-gray-500">
    <span className="font-semibold">Happy to serve you at geeks hub</span>
    </div>
    <div className="flex items-center">
      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse mr-2"></div>
      <p className="text-lg text-yellow-500 font-semibold">Pending</p>
    </div>
  </div>
</div>

      ): (
       
        <div className="w-full lg:h-64  items-center grid grid-cols-1 bg-white shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
        <div className="flex items-center mb-4">
         
          <div className="ml-2 ">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Start your Subscription Now </h2>
            <p className="text-lg text-gray-500">Click the button and request a Subscribers bundle</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
         <button onClick={handleSubRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Request Sub
      </button>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse mr-2"></div>
            <p className="text-lg text-red-500 font-semibold">Not subscribed</p>
          </div>
        </div>
      </div>
          )
          }


      
    </div>
  )
}

export default Subscription