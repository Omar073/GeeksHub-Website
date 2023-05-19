import React, { useState , useContext } from 'react';
import { auth , db } from './config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';
import { collection, doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword} from 'firebase/auth'
import { getDoc  ,getDocs, addDoc } from 'firebase/firestore'
import { UserContext } from './context/UserContext';
import {   signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
import { Gprovider } from './config/firebase';

export default function Login() {
  const navigate = useNavigate();
  const users= collection(db, 'users')
  const {authUserData , setauthUserData , update , setUpdate} = useContext(UserContext);
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      await signInWithEmailAndPassword(auth ,email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(auth.currentUser);
        console.log(authUserData);
      })
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      setUpdate(update+1);
      if (userDocSnap.exists()) {
        console.log('User document exists');
        if (userDocSnap.data().isAdmin) {
          navigate('/admin');
        }
          else if (userDocSnap.data().isEmployee) {
          navigate('/employee');
        }
        else {
          navigate('/home');
        }
        // do something with the user document
      } 
      else {
        console.log('User document does not exist');
        setUser(null);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, Gprovider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setUser(auth.currentUser);
        console.log(auth.currentUser);
      })
    }
    catch (error) {
      console.log(error);
    }
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    setUpdate(update+1);
    if (userDocSnap.exists()) {
      console.log('User document exists');
      if (userDocSnap.data().isAdmin) {
        navigate('/admin');
      }
      else if (userDocSnap.data().isEmployee) {
        navigate('/employee');
      }
      else {
        navigate('/home');
      }
      // do something with the user document
    } 
    else {
      console.log('User document does not exist');
      setUser(null);
    }
  };

  return (
  //   <div>
  //   <section className="bg-gray-50 dark:bg-gray-900">
  //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  //       <a
  //         href="#"
  //         className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white justify-items-center"
  //       >
  //         <img className="w-20 h-10 mr-2" src="/images/logo geeks.png" alt="logo" />
  //       </a>
  //       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
  //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
  //           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
  //             Sign in to your account
  //           </h1>
  //           <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
  //             <div>
  //               <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
  //                 Your email
  //               </label>
  //               <input
  //                 type="email"
  //                 name="email"
  //                 id="email"
  //                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //                 placeholder="name@company.com"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             <div>
  //               <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
  //                 Password
  //               </label>
  //               <input
  //                 type="password"
  //                 name="password"
  //                 id="password"
  //                 placeholder="••••••••"
  //                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 required
  //               />
  //                 </div>
  //                 <div className="flex items-center justify-between">
  //                     <div className="flex items-start">
  //                         <div className="flex items-center h-5">
  //                           <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
  //                         </div>
  //                         <div className="ml-3 text-sm">
  //                           <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
  //                         </div>
  //                     </div>
  //                     <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
  //                 </div>
  //                 <button type="submit"   
  //                 className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
  //                 Sign in </button>
  //                 <button type="button" onClick={handleGoogleLogin} class="text-white w-full  justify-center  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
  //                 <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
  //                 Sign in with Google
  //                 </button>
  //                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
  //                 Don't have an account yet? <a href="signup"  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
  //                 </p>
  //             </form>
  //         </div>
  //     </div>
  // </div>
  // </section>
  //   </div>

  <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
  <div className="container h-full p-10">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
      <div className="w-full">
        <div
          className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="g-0 lg:flex lg:flex-wrap">
            {/*  Left column container */}
            <div className="px-4 md:px-0 lg:w-6/12">
              <div className="md:mx-6 md:p-12">
                {/* Logo> */}
                <div className="text-center">
                  <img
                    className="mx-auto w-48"
                    src="logogeeks.png"
                    alt="logo" />
                  <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                    We are GeeksHub
                  </h4>
                </div>

                <form>
                  <p className="mb-4">Please login to your account</p>
                  {/* Username input> */}
                  <div className="relative mb-4" data-te-input-wrapper-init>
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput1"
                      placeholder="Username" />
                    <label
                      for="exampleFormControlInput1"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >Username
                    </label>
                  </div>

                  {/* Password input> */}
                  <div className="relative mb-4" data-te-input-wrapper-init>
                    <input
                      type="password"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput11"
                      placeholder="Password" />
                    <label
                      for="exampleFormControlInput11"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >Password
                    </label>
                  </div>

                 {/* Submit button */}
                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                      type="button"
                      onClick={handleSubmit}
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      style={{
                        background: "linear-gradient(to right, #4F46E5, #8B55E0, #4338CA)"
                      }}
                    >
                      Log in
                    </button>

                    {/* Forgot password link
                    <a href="#!">Forgot password?</a> */}
                  </div>

                  {/* Register button */}
                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 mr-2">Don't have an account?</p>
                    <button
                      type="button"
                      onClick={() => navigate('/signup')}
                      className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Register
                    </button>
                  </div>
                  </form>
                  </div>
                  </div>

                  {/* Right column container with background and description */}
                  <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{ background: "linear-gradient(to right, #4F46E5, #8B55E0, #4338CA)" }}
                  >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                  <h4 className="mb-6 text-xl font-semibold">
                    We are more than just a company
                  </h4>
                  <p className="text-sm">
                    "Welcome to GeeksHub! Find your perfect workspace and
                    unleash your productivity. Join our vibrant community of students,
                    professionals, and teams. Start collaborating, learning, and
                    achieving your goals in our modern co-working space."
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
