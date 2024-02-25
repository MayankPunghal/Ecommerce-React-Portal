import React from 'react';
import {Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Check if user data exists in localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');
  const expirationInMinutes = localStorage.getItem('expirationInMinutes');
  const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');

  // If user data exists, allow access to the route
  // Otherwise, redirect to the login page
  console.log("User Data : ",localStorage.getItem('userData'))
  console.log("Token : ",localStorage.getItem('token'))
  console.log("Expiration Time In Minutes: ",localStorage.getItem('expirationInMinutes'))
  console.log("Login Time : ",localStorage.getItem('loginTime'))
  console.log("Token Expiration Time : ",localStorage.getItem('tokenExpirationTime'))
  return userData ? (userData.userId > 0 && token != null) ? element : <Navigate to="/login" /> : <Navigate to="/login"/>;
};

export default PrivateRoute;
