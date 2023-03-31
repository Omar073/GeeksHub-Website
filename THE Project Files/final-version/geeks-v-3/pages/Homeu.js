import React, { Component } from 'react'
import SidebarU from '../components/SidebarU'
import Countdown from "../components/countdown";
import Sidebar from '@/components/Sidebar';
import Pricing from "../components/Pricing";
import image from "next/dist/client/legacy/image";

export default class Homeu extends Component {
    render() {
        return (
            <div>


                <Sidebar/>



                <div className="p-4 sm:ml-64 ">

                    <div className="p-4  flex flex-col space-y-10 ">


                        <div className="p-4 w-1/2 rounded-lg 	">

                            <span
                                className="font-bold text-transparent drop-shadow-xl shadow-white-500 text-6xl bg-clip-text bg-gradient-to-r from-purple-400 via-white-400 to-pink-600"
                            >
                               Dashboard
                            </span>




                        </div>
                        <hr style={{width:"50%"}}/>



                        <div className="p-4 border-2 drop-shadow-lg	dark:drop-shadow-none w-3/2 rounded-lg  text-center	">

                            <span className="text-4xl font-bold font-helvetica">Time remaining:</span>
                            <Countdown/>

                        </div>



                        <div className="p-4 border-2 border-transparent w-3/2 rounded-lg drop-shadow-lg	dark:drop-shadow-none text-center	">

                            <span className="text-3xl font-helvetica">Current subscription plan:</span>
                            <span className="text-3xl font-helvetica text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-amber-900 to-amber-500 dark:from-amber-100 dark:via-amber-50 dark:to-amber-500 "> <br/> <em> Premium </em> </span>

                            <div className="row">
                                <div className="col-md-5">
                                    <div className="book_room ">
                                        <h1 className="font-bold text-xl font-helvetica"><br/><br/>Book a Room Online</h1>
                                        <form className="book_now  ">
                                            <div className="row ">
                                                <div className="col-md-12 ">
                                                    <span><br/>Arrival: </span>

                                                        <input class=" block  p-4 drop-shadow-lg pl-20 dark:drop-shadow-none w-full text-center text-gray-900 pl-10 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="00:00:PM" type="time" name="dd/mm/yyyy"/>
                                                </div>
                                                <div className="col-md-12">
                                                    <span><br/>Hours: </span>
                                                        <input class="block  p-4 text-gray-900  text-center pl-8 w-full border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0"
                                                               type="number" name="dd/mm/yyyy"/>
                                                </div>
                                                <div className="pt-5 col-md-12">
                                                    <button
                                                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                     <span
                                                       className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                       Book Now
                                                     </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        );
    }

}
