import React, { useState, useContext, useEffect } from "react";
import {  db } from "./config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDoc, getDocs, addDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export default function Allusers() {
  const users = collection(db, "users");
  const [data, setData] = useState([]);
  const [datacopy, setDatacopy] = useState([]);
 
  const[inputValue,setInputValue]=useState('')

    useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(users);

        setData(
            data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        
        
        );
        
setDatacopy(data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })))

       
    };
    
   
    getUsers();

    }, []);

    useEffect(() => {
        const filterData = () => {
          const searchedUser = data
            .map((doc) => ({
              id: doc.id,
              ...doc,
            }))
            .filter(
              (user) =>
                (user.Email && user.Email.includes(inputValue)) ||
                (user.FirstName && user.FirstName.includes(inputValue)) ||
                (user.LastName && user.LastName.includes(inputValue))
            );
          setData(searchedUser);
        };
        const ahmed = async () => {

        if (inputValue !== "") {
          filterData();
        }
        else {
          await setData(datacopy);
        }
        };

        ahmed();
    
      
      
      }, [inputValue]);
      
      
   

    const searchUser = async () => {
       
        const searchedUser = data
          .map((doc) => ({
            id: doc.id,
            ...doc,
          }))
          .filter(
            (user) =>
              (user.Email && user.Email.includes(inputValue)) ||
              (user.FirstName && user.FirstName.includes(inputValue)) ||
              (user.LastName && user.LastName.includes(inputValue))
          );
      
       setData(searchedUser);
      
        
      };


      // is to update the user isblocked boolean
      const updateIsBlocked = async (id) => {
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const user = userDoc.data();
          await updateDoc(userRef, {
            isBlocked: true,
          });
        }
      }

      // is to unblock the user isblocked 
      const updateIsUnBlocked = async (id) => {
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const user = userDoc.data();
          await updateDoc(userRef, {
            isBlocked: false,
          });
        }
      }

         
            
      
      

       
 

   


  


  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 gap-5 overflow-x-auto sm:rounded-lg">






       





          {true ? (
            <>
            <div className="grid grid-cols-2 gap-5">
            <input onChange={(e) => setInputValue(e.target.value)} className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Search by name" />
            <button onClick={searchUser  } className= " w-1/4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Search by Name</button>
            </div>
            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                GeeksHub Users List
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  A list of everyone who has an active subscription with our
                  services.
                </p>
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
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user.id}>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {user.Name}
      </th>
      <td className="px-6 py-4">{user.Email}</td>
      <td className="px-6 py-4">{user.PhoneNumber}</td>
      <td className="px-6 py-4">{user.RemaningHours}</td>
      {user.isBlocked === false ? (
        <>
          <td className="px-6 py-4">
            <button
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => updateIsBlocked(user.id)}
            >
              Block User
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-6 py-4">
            <button
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => updateIsUnBlocked(user.id)}
            >
              Unblock User
            </button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>

            </table>
            </>
          ) : (
            <div className="flex justify-center items-center h-96">
              <h1 className="text-3xl text-gray-500">No Subscribers Yet</h1>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
