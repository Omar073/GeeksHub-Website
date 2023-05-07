import React, { useState, useEffect } from 'react';
import { db } from './config/firebase';

import { arrayUnion, collection } from "firebase/firestore";
import {getDocs} from 'firebase/firestore'
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import { getDoc } from 'firebase/firestore';

function MyShifts() {

//this is the user context that is used to get the auth user data
const{authUserData , setauthUserData, update , setUpdate} = useContext(UserContext);


//this is the employees collection in firestore
    const users= collection(db, 'employees')

// this is for the data of all employees
    const [activeShift , setActiveShift] = useState({})

// this is the data for the current employee
    const [currentEmployee , setCurrentEmployee] = useState({})

//useeffect to get the employees  data and to check if there is any one active  
    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(users);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })).filter((employee) => employee.isWorking === true);
            console.log(' hi hope you have a good day');
            if (filteredData.length > 0) {
                setActiveShift(filteredData[0]);
                console.log(filteredData[0]);
            }
            else {
                setActiveShift({})
            }
        }
        getEmployees();

        
    
    }, [])



  return (
    <div className=''>
    <div className=''>
        <h1>MyShifts</h1>
       
       {
              activeShift.isWorking & activeShift.id === authUserData.uid ? (
                <div className='flex flex-col w-full'>
                    <h1 className='text-black'>you are working</h1>
                    </div>
                ) : activeShift.isWorking & activeShift.id !== authUserData.uid ? (
                    <div className='flex flex-col'>
                        <h1 className='text-black'>someone else is working</h1>
                    </div>
                ) : (
                    <div className='flex flex-col'>
                        <h1 className='text-black'>you are not working</h1>
                        <button className='bg-emerald-800 text-white font-bold py-2 px-4 rounded-full'>Start my shift </button>

                    </div>
                )
       }

    </div>
    </div>
  )
}

export default MyShifts