import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Auth';
import { useState } from 'react';
import { auth , db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword} from 'firebase/auth'
import { getDoc  ,getDocs, addDoc } from 'firebase/firestore'
import { UserContext } from './UserContext';



const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user , setUser} = useContext(AuthContext);
  const {authUserData , setauthUserData} = useContext(UserContext);
  



  return (
    <Routes>
      <Route
        {...rest}
        element={
           user && !authUserData.isAdmin ? (
            <Element {...rest} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
