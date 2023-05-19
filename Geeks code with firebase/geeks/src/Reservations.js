import React, { useState, useEffect } from 'react';
import { db } from './config/firebase';

import { arrayUnion, collection } from "firebase/firestore";
import {getDocs} from 'firebase/firestore'
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import { getDoc } from 'firebase/firestore';


export default function Reservations() {

  //this is the user collection in firestore
  const users= collection(db, 'users')

  //this is the fetch data from firestore for all the users that have is active bollen true
      const [data , setData] = useState([])
  
  
 
  
  //this is the user context that is used to get the auth user data
      const{authUserData , setauthUserData, update , setUpdate} = useContext(UserContext);

      
      useEffect(() => {
        const getReserevations = async () => {
          const userRef = doc(db, 'users', authUserData.id);
            const  snap = await getDoc(userRef);

            if (snap.exists()) {
            // get data that have is active  bollen true

            const filteredData = snap.data()

          

          await   setData(filteredData.Reservations);
          console.log(data);
            }
        }


        getReserevations();
        setUpdate(update + 1);
        console.log('this is the data from the use effect');
       
    }, [])


    const logdata = () => {
      console.log('this is the data from the function');
      console.log(data);
    }



  return (
    <div>
        <div className="p-4 sm:ml-64">
      <div className="grid grid-cols-1 overflow-x-auto shadow-md sm:rounded-lg">
        <div>
            
            </div>
        <div className=" mt-1">
          <div className="inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
        </div>
          <table className=" w-3/2 text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead>
              <tr className ="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-transparent dark:border-none" >
                  <th>Date</th>
                  <th>Arrival Time</th>
                  <th>Departure Time</th>
                  <th>Total Hours</th>
                  <th>Price</th>
                  

              </tr>

              </thead>
{  
    data.length > 0 &&
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-black">
              {data.map((res) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {res.date}``
                    </th>
                    <td class="px-6 py-4">
                        {res.startTimeHour}
                    </td>
                    <td class="px-6 py-4">
                       { res.endTimeHour && res.endTimeHour}
                    </td>
                    <td class="px-6 py-4">
                    {   res.endTimeHour && res.endTimeHour - res.startTimeHour }
                    </td>
                    <td class="px-6 py-4">
                       
                    </td>
                </tr>

                ))
            }
            
              </tbody>
              }
            
          </table>
    </div>

    </div>


</div>
    ) ;
}