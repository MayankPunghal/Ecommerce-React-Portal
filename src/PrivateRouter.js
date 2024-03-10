import React from 'react';
import {Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Check if user data exists in localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');
  // const loginTime = localStorage.getItem('loginTime');
  const tokenExpirationTime = new Date(localStorage.getItem('tokenExpirationTime'));
  const currentDate = new Date();

  const isTokenValid = tokenExpirationTime > currentDate;
  // If user data exists, allow access to the route
  // Otherwise, redirect to the login page
  console.log("User Data : ",userData)
  console.log("Token : ",token)
  console.log("Login Time : ",localStorage.getItem('loginTime'))
  console.log("Token Expiration Time : ",tokenExpirationTime.toString())
  console.log("Current Date : ", currentDate.toString())
  console.log("Is Token Valid ? : ",isTokenValid)
  return userData ? (userData.userId > 0 && token != null && isTokenValid) ? element : <Navigate to="/login" /> : <Navigate to="/login"/>;
};

export default PrivateRoute;
