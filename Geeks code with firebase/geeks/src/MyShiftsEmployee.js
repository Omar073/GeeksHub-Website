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


//this is the state for the modal that shows when the user is is active status is updated
const [showModal, setShowModal] = useState(false);







// refresh the page function
    const refreshPage = () => {
        window.location.reload();
    }






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

//this is the function that is used to update the user is active status to false and update the price in the firestore and show the modal
const updateEmployeeWork = async (id) => {
    const userRef = doc(db, 'employees', id);
    await updateDoc(userRef, {
        isWorking: true,
    
    });

    await setUpdate(update + 1);
    setShowModal(true);

}



  return (
   
    

       <div>
       <div className="p-4 sm:ml-64">



        {/*    this is to show the box when the user is active status is updated */}   

        
 {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {authUserData.FirstName} {authUserData.LastName}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                 Your Shift has started good luck ;)
                 
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                 
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


       
     


       <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

           {
              activeShift.isWorking & activeShift.id == authUserData.id ? (
                <div className="w-full lg:h-64  items-center grid grid-cols-1   shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
                <div className="flex items-center mb-4">
                 
                  <div className="ml-2 ">
                    <h2 className="text-2xl font-bold text-[#735672] mb-3">You're currently active </h2>
                    <p className="text-lg text-gray-500">Good luck</p>
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
              </div>
                ) : activeShift.isWorking & activeShift.id !== authUserData.id ? (
                  <div className="w-full lg:h-64  items-center grid grid-cols-1   shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                   
                    <div className="ml-2 ">
                      <h2 className="text-2xl font-bold text-[#735672] mb-3">{activeShift.Name} is currently active </h2>
                      <p className="text-lg text-gray-500"></p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg text-gray-500">
                   
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse mr-2"></div>
                      <p className="text-lg text-orange-500 font-semibold"> </p>
                    </div>
                  </div>
                </div>
                ) : (
                  <div className="w-full lg:h-64  items-center grid grid-cols-1   shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                   
                    <div className="ml-2 ">
                      <h2 className="text-2xl font-bold text-[#735672] mb-3">No one is currently working </h2>
                      <p className="text-lg text-gray-500">you can start your shift now</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                  <button onClick={()=> updateEmployeeWork(authUserData.id)} className='bg-emerald-800 text-white font-bold py-2 px-4 rounded-full'>Start my shift </button>

                    <div className="text-lg text-gray-500">
                   
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse mr-2"></div>
                      <p className="text-lg text-red-500 font-semibold"> Not Active</p>
                    </div>
                  </div>
                </div>

                  
                )
       } 

   
 
</div>


     
 


</div>
</div>

  
        
  )
}

export default MyShifts