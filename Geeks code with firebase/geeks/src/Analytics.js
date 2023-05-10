import React, { useState, useEffect } from "react";
import { db } from "./config/firebase";

import { addDoc, arrayUnion, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";

function Analytics() {

  //this is the user collection in firestore
  const users = collection(db, "users");
  const cash = collection(db, "cash");
  const employees = collection(db, "employees");



  //this is the fetch data from firestore for all the users 
  const [data, setData] = useState([]);

  // this is the fetch data from firestore for all the employees
  const [data2, setData2] = useState([]);

  //this is the fetch data from firestore for all the subscriptions useres
  const [data3, setData3] = useState([]);

  //this is the fetch data from firestore for all the cash of today
  const [data4, setData4] = useState([]);

   //this is the user context that is used to get the auth user data
   const { authUserData, setauthUserData, update, setUpdate } =
   useContext(UserContext);


   useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(users);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const fetchData2 = async () => {
      const data2 = await getDocs(employees);
      setData2(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    
    const fetchData3 = async () => {
      const data3 = await getDocs(users);
      const filtered =data3.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((user) => user.isSub === true);
      setData3(filtered);
    };

    const fetchData4 = async () => {
      try {
        const data4 = await getDocs(cash);
        setData4(data4.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching cash data:", error);
        setData4([]);
      }
    };



    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
   
  }, []);










  return (
    <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 gap-5 overflow-x-auto  sm:rounded-lg">
        <div className="flex flex-col">
  <h2 className="mb-4 text-2xl font-bold">Summary</h2>

  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   

    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold">{data.length}   Total Users</h2>
        <p className="mt-2 text-sm text-gray-500">i don't know </p>
      </div>
    </div>
    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold">{data2.length} Employees</h2>
        <p className="mt-2 text-sm text-gray-500">Last authored 1 day ago</p>
      </div>
    </div>
    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold">{data3.length} Subscriber</h2>
        <p className="mt-2 text-sm text-gray-500">Last commented 8 days ago</p>
      </div>
    </div>
  </div>


  
</div>

<hr className="m-5"></hr>

<div className="flex flex-col gap-5">
  <h2 className="text-2xl font-bold">Cash collected</h2>
  

  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   

    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <div className="ml-4">
      {/*   i want to display cash collectyed item in first index of array data4 */}
      {data4.length>0?
      <>
        <h2 className="font-semibold"> {Math.round((data4[0].cashcollected)*100)/100}  Total Cash Collected</h2>
        <p className="mt-2 text-sm text-gray-500">i don't know </p>
        </>
        :<h2 className="font-semibold"> No Cash Collected</h2>
        }
      </div>
    </div>
    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <div className="ml-4">
      {data4.length>0?
      <>
        <h2 className="font-semibold">  {Math.round((data4[1].cashcollected)*100)/100}  Yesterday  Cash Collected</h2>
        <p className="mt-2 text-sm text-gray-500">i don't know </p>
        </>
        :<h2 className="font-semibold"> No Cash Collected</h2>
        }
      </div>
    </div>
    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold">{data3.length} Last month</h2>
        <p className="mt-2 text-sm text-gray-500">Last commented 8 days ago</p>
      </div>
    </div>
  </div>


  <table class="  m-5  text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  
                  <th scope="col" class="px-6 py-3">
                     Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Cash collected
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Number of reservations
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {/*         Users form data being mapped herein the table body           */}
                {data4.map((cash) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                     5/1/2021
                    </th>
                    <td class="px-6 py-4">
                      hi
                    </td>
                    <td>
                      number of res
                    </td>
                   
                   
                  </tr>
                ))}
              </tbody>
            </table>



  
</div>



    </div>
    </div>
  )
}

export default Analytics