import React, { useState, useEffect } from 'react';
import { db } from './config/firebase';

import { arrayUnion, collection, setDoc } from "firebase/firestore";
import {getDocs} from 'firebase/firestore'
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import { getDoc } from 'firebase/firestore';
import {AiFillCloseCircle} from 'react-icons/ai'

function EmployeesAdmin() {

//this is the user context that is used to get the auth user data
const{authUserData , setauthUserData, update , setUpdate} = useContext(UserContext);


//this is the employees collection in firestore
    const users= collection(db, 'employees')

// this is for the data of all employees
    const [activeShift , setActiveShift] = useState({})


// this is for all employees data 
    const [employees , setEmployees] = useState([])


//this is the state for the modal that shows when the user is is active status is updated
const [showModal, setShowModal] = useState(false);

// this is the state  shown in the modal of the add employee modal 
const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

//this is for the new employee email
const [newEmployeeEmail, setNewEmployeeEmail] = useState('');

//this is for the new employee data 
const [empData,setEmpData] = useState({});




//useeffect to get the employees  data and to check if there is any one active  
    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(users);
            setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })).filter((employee) => employee.isWorking === true);
            console.log(' hi hope you have a good day');
            if (filteredData.length > 0) {
                setActiveShift(filteredData[0]);
                console.log('filtered');
                console.log(filteredData[0]);
            }
            else {
                console.log('not filtered');
                setActiveShift({})
            }
        }
        getEmployees();

        
    
    }, [])

    const updateEmployeeWork = async (id) => {
      const userRef = doc(db, 'employees', id);
      await updateDoc(userRef, {
          isWorking: false,
          thisMonth : activeShift.thisMonth + 1,
  
      
      });
  
      await setUpdate(update + 1);
      setShowModal(true);
  
  }



// this is the function for the admin to add a new employee 



  return (
   
    

       <div>
       <div className="p-4 sm:ml-64 grid grid-cols-1 gap-10">



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





{/* this is the add employee modal */}




       
     


       <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
       {
  activeShift.isWorking ? (
    <div className="w-full lg:h-64  items-center grid grid-cols-1   shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
    <div className="flex items-center mb-4">
     
      <div className="ml-2 ">
        <h2 className="text-2xl font-bold text-[#735672] mb-3">{activeShift.Name} is currently Working </h2>
        <p className="text-lg text-gray-500">Email : {activeShift.Email}</p>
        <p className="text-lg text-gray-500">Number of shifts this month is : {activeShift.thisMonth}</p>
        <p className="text-lg text-gray-500">Number of shifts previous  month is : {activeShift.prevMonth}</p>

      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-lg text-gray-500">
        <button className="bg-red-500 hover:bg-red-700 text-white  py-2 px-2 rounded" onClick={() => updateEmployeeWork(activeShift.id)}>End Shift</button>
    
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse mr-2"></div>
        <p className="text-lg text-green-500 font-semibold"> Active</p>
      </div>
    </div>
  </div>
  ) : Object.keys(activeShift).length === 0 ? (
    <div className="w-full lg:h-64  items-center grid grid-cols-1   shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
    <div className="flex items-center mb-4">
     
      <div className="ml-2 ">
        <h2 className="text-2xl font-bold text-[#735672] mb-3">No one  is currently Working </h2>
      
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-lg text-gray-500">
    
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse mr-2"></div>
        <p className="text-lg text-red-500 font-semibold"> Off</p>
      </div>
    </div>
  </div>
  ) : (
    <div className='flex flex-col'>
      <h1 className='text-black'>eror</h1>
    </div>
  )
}


   
 
</div>

<hr className=" border-1 rounded-full border-gray-200" />{/* 
add employee button  */}


<div className='  text-right ' >
<button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowAddEmployeeModal(true)} >Add Employee</button>
   </div>


<div class="relative overflow-x-auto shadow-md sm:rounded-lg">  
<div class="flex flex-col">
   <table class=" w-full  text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
           
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              This Month Shifts
            </th>
            <th scope="col" class="px-6 py-3">
              Previous Month Shifts
            </th>
            
          </tr>
        </thead>
        <tbody>
       
  {
    employees.length > 0 ? (
      employees.map((employee) => (

       
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {employee.Name} 
              </th>
              <td class="px-6 py-4"> {employee.Email} </td>
              <td class="px-6 py-4">{employee.thisMonth}</td>
              <td class="px-6 py-4"> {employee.prevMonth}</td>
              
            </tr>
     
    

      ))
    ) : (
      <div className='flex flex-col'>
        <h1 className='text-black'>eror</h1>
      </div>
    )

  }
     </tbody>
      </table>
</div>
</div>

     
 


</div>
</div>


  
        
  )
}

export default EmployeesAdmin