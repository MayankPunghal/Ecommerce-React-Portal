// SignUp.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { showToast, ToastUtils } from '../UtilComponent/ToastUtil';
import useAuth from '../UtilComponent/AuthUtil';

const SignUp = () => {
  const defaultImgSrc = "/Images/no-image-available.png";
  const navigate = useNavigate(); // Initialize useNavigate
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    password: '',
    firstName: '',
    lastName: '',
    imageName: '',
    imageFile: undefined,
    imageSrc: defaultImgSrc

  });
  const { checkTokenValidity } = useAuth();

  const isValidEmail = (email) => {
    // Add your email validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Add your password validation logic here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,20}$/;
    return passwordRegex.test(password);
  };

  const showPreivew = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = X => {
        setFormData({
          ...formData,
          imageFile,
          imageSrc: X.target.result
        })
      }
      reader.readAsDataURL(imageFile)
    }
    else {
      setFormData({
        ...formData,
        imageFile: null,
        imageSrc: defaultImgSrc
      })
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'userName') {
      // Validating username (allowing only letters, numbers, dots, and underscores)
      const validInput = /^[a-zA-Z0-9._]*$/;
      if (validInput.test(value) || value === '') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      // For other fields, just update the state
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData()
    userData.append('userName', formData.userName)
    userData.append('userEmail', formData.userEmail)
    userData.append('password', formData.password)
    userData.append('firstName', formData.firstName)
    userData.append('lastName', formData.lastName)
    userData.append('imageFile', formData.imageFile)
    userData.append('imageName', formData.imageName)

    try {
      const response = await axiosInstance.post('/api/1/users/registeruser', userData, {
        headers : { "Content-Type": "multipart/form-data" }
      } 
      );
      console.log(response.data);
      if (response.data.status === 1) {
        showToast(`Success: ${response.data.message}`, true, 1000);
        setTimeout(() => {
          navigate('/LOGIN'); // Use navigate to redirect
        }, 1000);
      }
      else {
        showToast(`Error: ${response.data.message}`, false, 2000);
      }
    } catch (error) {
      showToast(`Error : ${error.response.data}`, false, 2000);
      console.error(`Error : ${error.response.data}`, error);
      if (error.response.status === 401) {
        checkTokenValidity();
      }
    }
  };

  return (
    <>
      <ToastUtils />
      <Link to="/" className="text-blue-500 hover:underline">Back</Link>
      <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 pl">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <img src={formData.imageSrc} className="object-cover w-auto h-auto max-h-48 place-items-center" />
          </div>
          <div className="flex justify-center">
            <input type="file" accept="image/*" onChange={showPreivew} />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={formData.password}
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
