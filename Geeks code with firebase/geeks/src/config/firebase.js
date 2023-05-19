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
  apiKey: "AIzaSyD4wCRE9MwlVZcF0C4ATMq6wJVtDxMtuhY",
  authDomain: "geeks-hub-v2.firebaseapp.com",
  projectId: "geeks-hub-v2",
  storageBucket: "geeks-hub-v2.appspot.com",
  messagingSenderId: "224326355125",
  appId: "1:224326355125:web:c719026c0f37786977d6fc",
  measurementId: "G-489V01VZ1Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Gprovider = new GoogleAuthProvider();
export const db = getFirestore(app);