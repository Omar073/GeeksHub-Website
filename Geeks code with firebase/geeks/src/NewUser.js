import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword , signInWithPopup, signOut } from 'firebase/auth'
import { getDocs ,collection , addDoc ,setDoc  ,doc} from 'firebase/firestore'
import { auth , db } from './config/firebase'
import { AuthContext } from './context/Auth';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { Gprovider } from './config/firebase';

export default function NewUser() {
  const users= collection(db, 'users')

  const navigate = useNavigate();

  const[FirstName, setFirstName] = useState('')
  const[LastName, setLastName] = useState('')
  const[Email, setEmail] = useState('')
  const { user, setUser } = useContext(AuthContext);

  const[Password, setPassword] = useState('')
  const [PhoneNumber , setPhoneNumber] = useState('')
  const [Faculty , setFaculty] = useState('')
  const[ConfirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    try{
      await createUserWithEmailAndPassword(auth, Email,Password)
      .then (async (userCredential) => {
          const user = userCredential.user;
          console.log(user)
          await setDoc(doc(users, user.uid), {
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Faculty: Faculty,
            Password: Password,
            isAdmin : false,
            isEmployee : false,
            isActive : false,
            isSub : false,
            RemaningHours : 0,
            Reservations : []

      })
      })

      setUser(auth.currentUser);
      console.log(auth.currentUser);
      navigate('/home');

      }
      catch(error){
          console.log(error)
      }
   
}

const handleSignInWithGoogle = async () => {
  try{
      await signInWithPopup(auth, Gprovider)
      .then (async (userCredential) => {
          const user = userCredential.user;
          console.log(user)
          await setDoc(doc(users, user.uid), {
            FirstName: user.displayName,
            LastName: user.displayName,
            Email: user.email,
            PhoneNumber: '',
            Faculty: '',
            Password: '',
            isAdmin : false,
            isEmployee : false,
            isActive : false,
            isSub : false,
            RemaningHours : 0,
            Reservations : []

      })
      })

      setUser(auth.currentUser);
      console.log(auth.currentUser);
      navigate('/home');

      

  }
  catch(error){
      console.log(error)
  }
}






  return (
    <div>
      
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img className="w-20 h-10 mr-2" src='/images/logo geeks.png' alt="logo" 
         />
              
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
               {/*  First name */}
              <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                      <input type="text" name="FirstName" id="FirstName" onChange={(e) => setFirstName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First" required=""/>
                  </div>
                {/*  Last name */}
                <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                      <input type="text" name="LastName" id="LastName" onChange={(e) => setLastName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last" required=""/>
                </div>

                  {/* Email Section  */}
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                 {/*  Password Section */}
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                 {/*  Confirm Password */}
                  <div>
                      <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>

                {/*  Phone Number */}
                <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone number</label>
                      <input type="text" name="phonenumber" id="phonenumber" onChange={(e) => setPhoneNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01020304050" required=""/>
                </div>

                {/*  Faculty */}
                 <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Faculty</label>
                      <input type="text" name="Faculty" id="Faculty" onChange={(e) => setFaculty(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                </div>
                  
                  

              


                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" onClick={handleSubmit} className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Create an account 
                    </button>
                    <button type="button" onClick={handleSignInWithGoogle} className="text-white w-full  justify-center  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
<svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
Sign Up with Google
</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</div>
  )
}
