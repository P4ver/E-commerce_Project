// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("PrivateRoute: isAuthenticated ", isAuthenticated )
  console.log("PrivateRoute: Auth ", useSelector((state) => state.auth) )

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
