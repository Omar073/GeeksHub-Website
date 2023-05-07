import React, { useState, useEffect } from "react";
import { db } from "./config/firebase";

import { arrayUnion, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { getDoc } from "firebase/firestore";

function ActiveUsers() {
  //this is the user collection in firestore
  const users = collection(db, "users");

  //this is the fetch data from firestore for all the users that have is active bollen true
  const [data, setData] = useState([]);

  //this is the state for the modal that shows when the user is is active status is updated
  const [showModal, setShowModal] = useState(false);

  //this is the user context that is used to get the auth user data
  const { authUserData, setauthUserData, update, setUpdate } =
    useContext(UserContext);

  //this is the state for the price that is used to update the price in the firestore
  var price = 0.5;

  // time
  var time= 0.0000;


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
    getUsers();
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
      } 
    
    
      time=trial.Reservations[trial.Reservations.length - 1].endTimeHour - trial.Reservations[trial.Reservations.length - 1].startTimeHour+(trial.Reservations[trial.Reservations.length - 1].endTimeMinute - trial.Reservations[trial.Reservations.length - 1].startTimeMin)/60
     

      console.log("tiiiiiiiiiiiiiiiiime")
      console.log(time)


      if (trial.isSub) {
        if( trial.RemaningHours > time )
        {
          trial.RemaningHours = trial.RemaningHours - time;
          price=0;


       }

        else{
        time= time - trial.RemaningHours;
          trial.RemaningHours = 0;
          price = time * 10;
        }


      } 
      else {
       price = time * 10;

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

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div class="pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">
              Search rr
            </label>
            <div class="relative mt-1">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>

          {/*    this is to show the box when the user is active status is updated */}
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                      Price to be paid IS : {displayPrice}$
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

          {/* this is the table that is used to check if there is a data to show or not the  */}
          {data.length > 0 ? (
            <table class=" w-full  text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
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
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="checkbox-table-search-1" class="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.FirstName} {user.LastName}
                    </th>
                    <td class="px-6 py-4">{user.Email}</td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4">
                      <button
                        onClick={() => updateUserActivity(user.id)}
                        className=" bg-blue-600 text-white  w-full "
                      >
                        {" "}
                        Edit
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

        <div class="my-20 ..."></div>
      </div>
    </div>
  );
}

export default ActiveUsers;
