import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import { showToast, ToastUtils } from '../UtilComponent/ToastUtil';
import EncryptionUtil from '../UtilComponent/EncryptionUtil';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  // const { encrypt } = EncryptionUtil();
  
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const audience = process.env.REACT_APP_AUDIENCE;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Clear localStorage on component mount (login page load)
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (!formData.userName || !formData.password) {
      showToast('Please fill in all the fields.', false, 2000);
      return;
    }

    try {
      // const encryptedData = await encrypt(formData);
      const response = await axios.post(
        '/api/1/users/loginbyusername',
        formData,
        {
          headers: {
            'Audience': audience,
          }
        }
      );

      if (response.data.status === 1) {
        // Successful login
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        const [tokenPart, expirationInMinutesPart] = response.data.token.split(',');
        // Trim both parts
        const trimmedToken = tokenPart.trim();
        const trimmedExpirationInMinutes = parseInt(expirationInMinutesPart.trim());
        const loginTime = new Date();
        const tokenExpirationTime = new Date(loginTime.getTime() + trimmedExpirationInMinutes * 60000);
        localStorage.setItem('token', trimmedToken);
        localStorage.setItem('expirationInMinutes', trimmedExpirationInMinutes);
        localStorage.setItem('loginTime', loginTime);
        localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
        showToast(`Welcome back, ${response.data.user.userName}!`, true, 1000);
        // Redirect to the home page after 1 second using navigate
        setTimeout(() => {
          navigate('/Ecom/home'); // Use navigate to redirect
        }, 1000);
      } else {
        // Unsuccessful login
        showToast(`Error: ${response.data.message}`, false, 2000);
      }
    } catch (error) {
      // Handle other errors
      showToast(`Error: ${error.response.data.message}`, false, 2000);
    }
  };

  return (
    <>
    <ToastUtils />
    <Link to="/" className="text-blue-500 hover:underline">Back</Link>
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-600">
              Username:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required // Mark input as required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required // Mark input as required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
        <Link to="/signup" className="text-blue-500">Create an account</Link>
      </p>
      </div>
    </div>
    </>
  );
};

export default Login;
