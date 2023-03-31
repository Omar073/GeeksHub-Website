import React from 'react'
import { NextSeo } from "next-seo";
import Adminbar from '@/components/Adminbar';

export default function Subscribers_admin() {
  return (
    <div>
      <Sidebar />
        <div className="p-4 sm:ml-64">
      <div className="grid grid-cols-1 overflow-x-auto shadow-md sm:rounded-lg">
        <div>
            
            </div>
        <div className=" mt-1">
          <div className="inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
        </div>
          <table className="h-screen w-3/2 text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead>
              <tr className ="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-transparent dark:border-none" >
                  <th>Date</th>
                  <th>Arrival Time</th>
                  <th>Departure Time</th>
                  <th>Total Hours</th>
                  <th>Price</th>
                  <th>Report Reservation</th>

              </tr>

              </thead>

              <tbody>
              <tr  className="p-4 text-lg">
                  <td>2023-03-01</td>
                  <td>09:00 AM</td>
                  <td>05:00 PM</td>
                  <td ><strong>8</strong></td>
                  <td>amount EGP</td>
                  <td><button class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full">Report</button></td>
              </tr>
              <tr  className="p-4 text-lg">
                  <td>2023-03-02</td>
                  <td>10:00 AM</td>
                  <td>03:00 PM</td>
                  <td><strong>5</strong></td>
                  <td>amount EGP</td>
                  <td><button class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full">Report</button></td>
              </tr >
              <tr  className="p-4 text-lg">
                  <td>2023-03-03</td>
                  <td>11:00 AM</td>
                  <td>04:00 PM</td>
                  <td><strong>5</strong></td>
                  <td>amount EGP</td>
                  <td><button class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full">Report</button></td>
              </tr>
              </tbody>
          </table>
    </div>

    </div>


</div>
    ) ;
}