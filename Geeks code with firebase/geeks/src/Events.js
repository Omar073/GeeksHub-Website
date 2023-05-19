import React, { useState, useEffect } from "react";
import { db } from "./config/firebase";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

function Events() {
    //this is the user collection in firestore
    const events = collection(db, "events");
    const [data, setData] = useState([]);

    // the variables of decription
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [iD, setId] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState("");

    const [error, setError] = useState("");
    const[showError, setShowError] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
        const data = await getDocs(events);
        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);


    const addEvent = async (e) => {
        e.preventDefault();

        //get data from firestore
        const events = collection(db, "events");
        const data = await getDocs(events);
        const filteredData = data.docs.filter((doc) => doc.id === iD);

       

        if (filteredData.length > 0) {
            setError("ID already exists");
            console.log("ID already exists");
            setShowError(true);
            

      
    }
    else {
        try{

            await setDoc(doc(db, "events", iD), {
                name: name,
                description: description,
                date : date,
                link: link,
                image : image,
                id: iD,
            });
            }catch (err) {
                setError(err.message);
            }
        }
    };

    const deleteEvent = async (id) => {
        await deleteDoc(doc(db, "events", id));
    };




  return (
    <div className="p-4 sm:ml-64">
    <div className="grid grid-cols-1 gap-5 overflow-x-auto  sm:rounded-lg">

        {data.length >0 ? (

            <div>

        {
            data.map((event) => (
            
                
<div className='grid grid-cols-3 gap-6'>
   
   <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none">
       <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt=""/>
       <div className="flex flex-col justify-between p-4 leading-normal">
           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
       </div>
       <button onClick={(id) => deleteEvent(event.id)} className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-b-lg hover:bg-indigo-700 md:rounded-none md:rounded-r-lg md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Delete
              </button>
   </a>
   
   
   </div>
            ))

        }

<form className="flex flex-col w-full max-w-lg mx-auto my-8">


<div className="flex flex-col w-full mb-2">
<label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Name</label>
<input type="text" onChange={(e) => setName(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Name"/>
</div>


<div className="flex flex-col w-full mb-2">
<label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Description</label>
<input type="text" onChange={(e) => setDescription(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Description"/>
</div>


<div className="flex flex-col w-full mb-2">
<label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Date</label>
<input type="text"  onChange={(e) => setDate(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Date"/>
</div>


<div className="flex flex-col w-full mb-2">
<label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event ID</label>
<input type="text"  onChange={(e) => setId(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event ID"/>
</div>


<div className="flex flex-col w-full mb-2">
<label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Link</label>
<input type="text"  onChange={(e) => setLink(e.target.value)}  className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Link"/>
</div>


<div className="flex flex-col w-full mb-2">
<label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Image</label>
<input type="text"  onChange={(e) => setImage(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Image"/>
</div>
    
<button onClick={addEvent} className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-b-lg hover:bg-indigo-700 md:rounded-none md:rounded-r-lg md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
Add Event
</button>

{
                showError ? 
                <p className="text-red-500">{error}</p>
                : null
               }



</form>



        </div>

        ) : (
            <div>
                
                <form className="flex flex-col w-full max-w-lg mx-auto my-8">


                <div className="flex flex-col w-full mb-2">
                <label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Name"/>
                </div>


                <div className="flex flex-col w-full mb-2">
                <label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Description</label>
                <input type="text" onChange={(e) => setDescription(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Description"/>
                </div>


                <div className="flex flex-col w-full mb-2">
                <label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Date</label>
                <input type="text"  onChange={(e) => setDate(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Date"/>
                </div>


                <div className="flex flex-col w-full mb-2">
                <label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event ID</label>
                <input type="text"  onChange={(e) => setId(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event ID"/>
                </div>


                <div className="flex flex-col w-full mb-2">
                <label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Link</label>
                <input type="text"  onChange={(e) => setLink(e.target.value)}  className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Link"/>
                </div>

                
              


                <div className="flex flex-col w-full mb-2">
                <label className="mb-1 text-xs font-bold tracking-wide text-gray-900 dark:text-gray-50">Event Image</label>
                <input type="text"  onChange={(e) => setImage(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Event Image"/>
                </div>

                    
                <button onClick={addEvent} className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-b-lg hover:bg-indigo-700 md:rounded-none md:rounded-r-lg md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Event
                </button>
                {
                showError ? 
                <p className="text-red-500">{error}</p>
                : null
               }

                </form>

                </div>
        )
        }







        </div>
    </div>
  )
}

export default Events