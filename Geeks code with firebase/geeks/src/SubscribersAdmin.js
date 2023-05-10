import React, { useState , useContext, useEffect } from 'react';
import { auth , db } from './config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';
import {setUser} from './context/Auth';
import { collection, doc, setDoc } from "firebase/firestore";
import { getDoc  ,getDocs, addDoc } from 'firebase/firestore'










export default function SubscribersAdmin() {


    

    const users= collection(db, 'users')
    const [data , setData] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(users);
            // get data that hve is admin bollen true

            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })).filter((user) => user.isSub === true);

            console.log(filteredData);


            setData(filteredData);
        }
        getUsers();
    }, [])








  return (
    <div>
        <div className="p-4 sm:ml-64">
      <div className="grid grid-cols-1 overflow-x-auto sm:rounded-lg">

        <div>
          Sub Request
        </div>
       







        { data.length > 0 ?
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            GeeksHub Subscribers List
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">A list of everyone who has an active subscription with our services.</p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            
            <tr>
            
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Remaining Hours
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
    <tbody>
        {data.map((user) => (
           
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.FirstName} {user.LastName}
                </th>
                <td className="px-6 py-4">
                    {user.Email}
                </td>
                <td className="px-6 py-4">
                    {user.PhoneNumber}
                </td>
                <td className="px-6 py-4">
                    {user.RemaningHours}
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        ))}
    </tbody>
        </table>
        : <div className="flex justify-center items-center h-96">
            <h1 className="text-3xl text-gray-500">No Subscribers Yet</h1>
        </div>
        }
    </div>

    </div>


</div>
    ) ;
}