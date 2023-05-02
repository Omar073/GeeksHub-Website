import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user , setUser} = useContext(AuthContext);

  return (
    <Routes>
      <Route
        {...rest}
        element={
           user ? (
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
