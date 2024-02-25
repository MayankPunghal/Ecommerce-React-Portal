// SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showToast, ToastUtils } from '../UtilComponent/ToastUtil';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/1/users/setuser', formData);
      console.log(response.data);
      if(response.data.status === 1)
      {
        showToast(`Success: ${response.data.message}`);
      }
      else
      {
        showToast(`Error: ${response.data.message}`, false);
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <>
     <ToastUtils />
     <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
    </>
  );
};

export default SignUp;
