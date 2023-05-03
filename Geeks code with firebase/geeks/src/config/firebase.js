// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZRHzjRs52GCuecenaHX2qXcYzqph5kIs",
  authDomain: "geeks-hub-47b71.firebaseapp.com",
  projectId: "geeks-hub-47b71",
  storageBucket: "geeks-hub-47b71.appspot.com",
  messagingSenderId: "485388101146",
  appId: "1:485388101146:web:59897e11b25fe0c0bdd3a3",
  measurementId: "G-LM9XFFC9ZG"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Gprovider = new GoogleAuthProvider();
export const db = getFirestore(app);