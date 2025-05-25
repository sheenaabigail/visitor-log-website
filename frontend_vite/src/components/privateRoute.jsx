import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  console.log("goes to login page if not Authenticated");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
