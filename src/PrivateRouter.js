import React from 'react';
import {Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Check if user data exists in localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));

  // If user data exists, allow access to the route
  // Otherwise, redirect to the login page
  console.log("User Data",localStorage.getItem('userData'))
  return userData.userId > 0 ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
