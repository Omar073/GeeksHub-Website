import React, { useState, useEffect } from "react";
import { db } from "./config/firebase";
import {RiUserFollowFill} from "react-icons/ri";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import {RiUserStarFill} from "react-icons/ri";
import {FaMoneyBillWave} from "react-icons/fa";

function ActiveUsers() {
  //this is the user collection in firestore
  const users = collection(db, "users");
  const cash = collection(db, "cash");

  //this is the fetch data from firestore for all the users that have is active bollen true
  const [data, setData] = useState([]);

  //this is the state for the modal that shows when the user is is active status is updated
  const [showModal, setShowModal] = useState(false);

  //this is the user context that is used to get the auth user data
  const { authUserData, setauthUserData, update, setUpdate } =
    useContext(UserContext);

  // this is for the data of active sub users
  const [subData, setSubData] = useState([]);

  //this is the state for the price that is used to update the price in the firestore
  var price = 0.5;

  // time
  var time = 0.0;

  // display price
  const [displayPrice, setDisplayPrice] = useState(0);

  //this is the use effect that is used to get the data from firestore when the page is loaded
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(users);

      // get data that have is active  bollen true

      const filteredData = data.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.isActive === true);

      console.log(filteredData);

      setData(filteredData);
    };
    
    const getSubUsers = async () => {
      const data = await getDocs(users);
      const filteredData = data.docs

        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.isSub === true &&user.isActive === true);
        setSubData(filteredData);
      }


    getUsers();
    getSubUsers();
    setUpdate(update + 1);
  }, []);

  // this is the function that is used to update the user is active status to false and update the price in the firestore and show the modal
  const updateUserActivity = async (id) => {
    const userRef = doc(db, "users", id);
    setUpdate(update + 1);

    // get the data in user trial by get doc
    const userTrial = await getDoc(userRef);

    if (userTrial.exists()) {
      const trial = userTrial.data();

      trial.Reservations[trial.Reservations.length - 1] = {
        ...trial.Reservations[trial.Reservations.length - 1],

        endTimeHour: new Date().getHours(),
        endTimeMinute: new Date().getMinutes(),
      };

      time =
        trial.Reservations[trial.Reservations.length - 1].endTimeHour -
        trial.Reservations[trial.Reservations.length - 1].startTimeHour +
        (trial.Reservations[trial.Reservations.length - 1].endTimeMinute -
          trial.Reservations[trial.Reservations.length - 1].startTimeMin) /
          60;

      if (trial.isSub) {
        if (trial.RemaningHours > time) {
          trial.RemaningHours = trial.RemaningHours - time;
          price = 0;
        } else {
          time = time - trial.RemaningHours;
          trial.RemaningHours = 0;
          trial.isSub = false;
          
          price = Math.round(time * 10) ;
        }
      } else {
        price =  Math.round(time * 10) ;
       
      }
      console.log("price i" + price);

      trial.Reservations[trial.Reservations.length - 1] = {
        ...trial.Reservations[trial.Reservations.length - 1],

        price: price,
      };

      await updateDoc(userRef, {
        isActive: false,
        Reservations: trial.Reservations,
        RemaningHours: trial.RemaningHours,
      });

      console.log("user active status updated");
      const data = await getDocs(users);
      const filteredData = data.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.isActive === true);

      // get today month
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const day = new Date().getDate();
      const docId = `${day}${month}${year}`;

      const cashRef = doc(db, "cash", docId);
      const cashDoc = await getDoc(cashRef);

      if (cashDoc.exists()) {
        const cash = cashDoc.data();
        await updateDoc(cashRef, {
          cashcollected: cash.cashcollected + price,
          Reservations: cash.Reservations + 1,

        });
      } else {
        await setDoc(doc(db, "cash", docId), {
          cashcollected: price,
          Reservations: 1,
          SubscribersSecoundry: 0,
          SubscribersPrimary: 0,
          date:`${day}/${month}/${year}`,
        });
      }

      setData(filteredData);
      setShowModal(true);
      setDisplayPrice(price);
    } else {
      console.log("User does not exist.");
    }
  };

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 overflow-x-auto shadow-md sm:rounded-lg"></div>

        <div class="relative overflow-x-auto sm:rounded-lg grid grid-cols-1 gap-5">
          <h2 className="mb-4 text-2xl font-bold">Summary </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            
            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
               <RiUserFollowFill className="h-6 w-6 text-red-400"/>
              </div>

              <div className="ml-4">
                {data.length > 0 ? 
                <>
                <h2 className="font-semibold">{data.length} Active Users</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Last authored 1 day ago
                </p>
                </>
                : <h2 className="font-semibold">No Active Users</h2>}
                
              </div>
            </div>
            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
               <RiUserStarFill className="h-6 w-6 text-indigo-400"/>
              </div>

              <div className="ml-4">
              {subData.length > 0 ? 
                <>
                <h2 className="font-semibold">{subData.length} Active Subscibed Users</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Last authored 1 day ago
                </p>
                </>
                : <h2 className="font-semibold">No Active Subscibed Users</h2>}
              </div>
            </div>
          </div>

          <hr className=" text-center m-5" />
          

          {/*    this is to show the box when the user is active status is updated */}

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start  gap-2 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      
                      <div>
                      <FaMoneyBillWave className="h-8 w-8 text-green-500  " />
                      </div>
                      <div>
                      <h3 className="text-3xl font-semibold">
                        Cash Collected
                      </h3>
                      </div>
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
                      Total Cash : {displayPrice}$
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

<h2 className="mb-4 text-2xl font-bold">Active Users Table</h2>

          {/* this is the table that is used to check if there is a data to show or not the  */}
          {data.length > 0 ? (
            <table class=" w-full  text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                 
                  <th scope="col" class="px-6 py-3">
                    user name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    starting time
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/*         Users form data being mapped herein the table body           */}
                {data.map((user) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                   
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.Name}
                    </th>
                    <td class="px-6 py-4">{user.Email}</td>
                    <td class="px-6 py-4">{user.Reservations[user.Reservations.length-1].startTimeHour}h  {user.Reservations[user.Reservations.length-1].startTimeMin}m </td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4">
                      <button
                        onClick={() => updateUserActivity(user.id)}
                        className=" bg-blue-600 text-white  w-full "
                      >
                        
                        Check Out
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-96">
              <h1 className="text-3xl text-gray-500">No Active Users Yet</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveUsers;
