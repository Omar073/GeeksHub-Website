import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword , signInWithPopup, signOut } from 'firebase/auth'
import { getDocs ,collection , addDoc ,setDoc  ,doc} from 'firebase/firestore'
import { auth , db } from './config/firebase'
import { AuthContext } from './context/Auth';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { Gprovider } from './config/firebase';
import { getDoc } from 'firebase/firestore'


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
            Name : FirstName + '  ' + LastName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Faculty: Faculty,
            Password: Password,
            isAdmin : false,
            isEmployee : false,
            isActive : false,
            isSub : false,
            RemaningHours : 0,
            Reservations : 
            []
            ,id : user.uid
            ,subRequest: false

      })
      })

      if (auth.currentUser) {
        setUser(auth.currentUser);
        console.log(auth.currentUser);
        navigate('/home');
        }
        else {
          console.log('User not found');
          setUser(null);
  
        }

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
            Name : user.displayName,
            Email: user.email,
            PhoneNumber: '',
            Faculty: '',
            Password: '',
            isAdmin : false,
            isEmployee : false,
            isActive : false,
            isSub : false,
            RemaningHours : 0,
            Reservations : [],
            id : user.uid
            ,subRequest: false

      })
      })

      setUser(auth.currentUser);
      console.log(auth.currentUser);

      

  }
  catch(error){
      console.log(error)
  }


  const userDocRef = doc(db, "users", auth.currentUser.uid);

        const userDocSnap = await getDoc(userDocRef);
          
        if (userDocSnap.exists()) {
          console.log('User document exists');
          if (userDocSnap.data().isAdmin) {
            navigate('/admin');
          }
          else {
            navigate('/home');
          }
          // do something with the user document
        } else {
          console.log('User document does not exist');
        }

}

const tohome = () =>{  navigate('/'); }




  return (

    <div className
    ="h-screen md:flex  py-2 px-2 shadow-2xl rounded-full" >
	<div
		className
    ="rounded-md relative overflow-hidden bg-gradient-to-tr from-blue-800 to-purple-700 md:flex w-1/2 i justify-around items-center hidden ">
		<div>
      {/* geeks hub label */}
			<h1 className
      ="text-white font-bold text-4xl font-sans text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-500 dark:via-purple-400 dark:to-indigo-500">Geeks Hub</h1>
			<p className
      ="text-white mt-1">Join the hub of innovation and collaboration </p>
      {/* button read more */}
			<button type="submit" onClick={tohome} className
      ="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
		</div>
		<div className
    ="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className
    ="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className
    ="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className
    ="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
	</div>
  {/* container */}

  
	<div className
  ="flex md:w-1/2 justify-center py-10 items-center  ">
		<form className
    bg-white>
			<h1 className
      ="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
			<p className
      ="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
      {/* first name */}
			<div className
      ="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" className
        ="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd" />
				</svg>
				<input className
        =" pl-2 outline-none border-none"  onChange={(e) => setFirstName(e.target.value)} type="text" name="" id="" placeholder="Full name" />
      </div>
{/* last name */}
				<div className
        ="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" className
          ="h-5 w-5 text-gray-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
					</svg>
					<input className
          ="  pl-2 outline-none border-none" type="text" name="" id="" placeholder="Last Name"  onChange={(e) => setLastName(e.target.value)} />
      </div>
{/* email */}
					<div className
          ="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" className
            ="h-5 w-5 text-gray-400" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						</svg>
						<input className
            ="  pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} />
      </div>
{/* password */}
						<div className
            ="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" className
              ="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input className
              ="  pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      {/* confirm password */}
      <div className
            ="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" className
              ="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input className
              ="  pl-2 outline-none border-none" type="text" name="" id="" placeholder="confirm password"  />
      </div>
{/* phone number*/}
<div className
            ="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" className
              ="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input className
              =" pl-2 outline-none border-none" type="text" name="" id="" placeholder="phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
     {/* your faculty */}
      <div className
            ="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" className
              ="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input className
              =" bg-[#429D9B]pl-2 outline-none border-none" type="text" name="" id="" placeholder="your faculty" onChange={(e) => setFaculty(e.target.value)} />
      </div>
							<button type="submit" className
              ="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2" onClick={handleSubmit} >sign up</button>
							<span className
              ="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
		</form>
    </div>
	</div>
  

  )
}
