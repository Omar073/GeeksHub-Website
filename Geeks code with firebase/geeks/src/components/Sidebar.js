import React from 'react'
import { useState, useEffect ,useContext } from "react";
import { Link, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { UserContext } from  '../context/UserContext'
import {RiHistoryLine} from 'react-icons/ri'


function Sidebar() {
   // Auth context for user state
   const { user, setUser } = useContext(AuthContext);

// data for the authourized user   
   const [data , setData] = useState({})

// user context for user data
    const {authUserData , setauthUserData , update , setUpdate} = useContext(UserContext);



// navigate to other pages
   const navigate = useNavigate()




  


   const handleLogout = async () => {
      try {
         await
          signOut(auth);
         navigate('/');
         setUser(null);
         setUpdate(update + 1)
         
        
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className='flex flex-cols-2 gap-10'>


      <div>
          <Disclosure as="nav">
              <Disclosure.Button className="absolute top-2 left-2  items-center peer justify-center rounded-md  text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                <GiHamburgerMenu
                  className="block md:hidden h-6 w-6"
                  aria-hidden="true"
                />
              </Disclosure.Button>
              <div className="p-6 w-1/2   shadow-lg h-screen  bg-gray-100 z-20 fixed top-0 -left-96 lg:left-0  lg:w-72 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                <div className="flex flex-col justify-start item-center">
                  <h1 className="text-base text-center cursor-pointer font-bold text-[#735672] border-b border-gray-100 pb-4 w-full">
                    Hello {authUserData.Name}
                  </h1>
                  <div className=" my-4 border-b border-gray-100 pb-4">
                    
                    <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <Link to='' className='flex m-1 gap-4' >
                      <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                      
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Home
                      </h3>
                      </Link>
                    </div>
                    
                    <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <Link to='reservations' className='flex m-1 gap-4' >
                      <RiHistoryLine className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Reservation History
                      </h3>
                      </Link>
                    </div>
                    <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <Link to='subscribtions' className='flex m-1 gap-4' >
                      <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        My Subscribtion
                      </h3>
                      </Link>
                    </div>
                    
                  </div>
                  {/* setting  */}
                  <div className=" my-4 border-b border-gray-100 pb-4">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <Link to='settings' className='flex m-1 gap-4' >
                      <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                     
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Settings
                      </h3>
                      </Link>
                    </div>
                   
                  </div>
                  {/* logout */}
                  <div className=" my-4">
                   
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <button onClick={handleLogout} className='flex m-1 gap-4' >
                      <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                     
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Logout
                      </h3>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Disclosure>
      </div>
      <div className='w-full p-6'>
      
      <Outlet />
      </div>
      
      
            </div>
  )
}
export default Sidebar;