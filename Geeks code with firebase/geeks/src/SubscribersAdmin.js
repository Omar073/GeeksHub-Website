import React, { useState, useContext, useEffect } from "react";
import {  db } from "./config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDoc, getDocs, addDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export default function SubscribersAdmin() {
  const users = collection(db, "users");
  const [data, setData] = useState([]);
  const [sub, setSub] = useState([]);
  const [cashData, setCashData] = useState(0);
  const[showModal,setShowModal]=useState(false)
  const [datacopy, setDatacopy] = useState([]);
 
  const[inputValue,setInputValue]=useState('')

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(users);
      // get data that hve is admin bollen true

      const filteredData = data.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.isSub === true);


      setData(filteredData);
      setDatacopy(filteredData);
    };

    const getSub = async () => {
      const data = await getDocs(users);
      // get data that hve is admin bollen true
      const filteredData = data.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.subRequest === true);

      setSub(filteredData);

    
    };

    getUsers();
    getSub();
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
  

  const handlePrime = async (id) => {
    const userRef = doc(db, "users", id);
    await  updateDoc(userRef, {
      isSub: true,
      subRequest: false,
      RemaningHours: 50,
    });

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const day = new Date().getDate();
    const docId = `${day}${month}${year}`;

    const cashRef = doc(db, "cash", docId);
    const cashDoc = await getDoc(cashRef);

    if (cashDoc.exists()) {
      const cash = cashDoc.data();
      await updateDoc(cashRef, {
        cashcollected: cash.cashcollected + 200,
        SubscribersPrimary: cash.SubscribersPrimary + 1,



        
      });
    } else {
      await setDoc(doc(db, "cash", docId), {
        cashcollected: 200,
        Reservations: 0,
        SubscribersPrimary:1,
        SubscribersSecoundry: 0
        
      });
    }

    setCashData( 200);
    setShowModal(true);


  };


  const handleSecoundry = async (id) => {
    const userRef = doc(db, "users", id);
    await  updateDoc(userRef, {
      isSub: true,
      subRequest: false,
      RemaningHours: 30,
    });

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const day = new Date().getDate();
    const docId = `${day}${month}${year}`;

    const cashRef = doc(db, "cash", docId);
    const cashDoc = await getDoc(cashRef);

    if (cashDoc.exists()) {
      const cash = cashDoc.data();
      await updateDoc(cashRef, {
        cashcollected: cash.cashcollected + 100,
        SubscribersSecoundry: cash.SubscribersSecoundry + 1,
        
      });
    } else {
      await setDoc(doc(db, "cash", docId), {
        cashcollected: 100,
        SubscribersSecoundry: 1,
        SubscribersPrimary: 0,
        Reservations: 0,
        
      });
    }

    setCashData( 100);
    setShowModal(true);




    
  };


    const handleDecline = async (id) => {
    const userRef = doc(db, "users", id);
    await setDoc(userRef, {
        isSub: false,
        subRequest: false,
        RemaningHours: 0,
    });
    };


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



  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 gap-5 overflow-x-auto sm:rounded-lg">


          <div>
            <div className="w-full lg:h-64  items-center grid grid-cols-1 bg-white shadow-lg rounded-lg overflow-hidden p-6 transform transition duration-500 hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="ml-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Subscription request
                  </h2>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {sub.length > 0 ? (
                  <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                          Primary Subscription
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Secoundry Subscription
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub.map((user) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {user.Name}
                          </th>
                          <td className="px-6 py-4">{user.Email}</td>
                          <td className="px-6 py-4">{user.PhoneNumber}</td>
                          <td className="px-6 py-4">
                            <button onClick={()=>handlePrime(user.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">
                              Primary
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={()=>handleSecoundry(user.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                              Secoundry
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={handleDecline} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                              Decline
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                 
                    <h1 className="text-xl text-gray-500">
                      No Requests Yet
                    </h1>
                )}
              </div>
            </div>
          </div>


          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        
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
                      Price to be paid IS : {cashData}$
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







          {data.length > 0 ? (
            <div>
             <div className="grid grid-cols-2 gap-5">
             <input onChange={(e) => setInputValue(e.target.value)} className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Search by name" />
             <button onClick={searchUser  } className= " w-1/4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Search by Name</button>
             </div>
            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                GeeksHub Subscribers List
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
                 
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.FirstName} {user.LastName}
                    </th>
                    <td className="px-6 py-4">{user.Email}</td>
                    <td className="px-6 py-4">{user.PhoneNumber}</td>
                    <td className="px-6 py-4">{user.RemaningHours}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-5">
             <input onChange={(e) => setInputValue(e.target.value)} className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Search by name" />
             <button onClick={searchUser  } className= " w-1/4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Search by Name</button>
             </div>
            <div className="flex justify-center items-center h-96">
              
              <h1 className="text-3xl text-gray-500">No Subscribers Yet</h1>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
