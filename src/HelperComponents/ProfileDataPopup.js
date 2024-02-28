import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileDataPopup = ({ togglePopup, showPopup, user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('expirationInMinutes');
    localStorage.removeItem('tokenExpirationTime');

    // Navigate to the Login page
    navigate('/login');
  };

  return (
    <div className="">
      <div className="flex items-center justify-end cursor-pointer" onClick={togglePopup}>
        <p className="text-gray-800 font-semibold">
          Welcome, {user.userName} !
        </p>
        <svg
          className={`ml-2 h-5 w-4 transition-transform ${
            showPopup ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {showPopup && (
        <div className="top-15 right-2 bg-white border shadow-md rounded-md">
          {/* Add some styling here */}
          <p className="text-gray-800 hover:bg-blue-500 hover:text-white rounded-t-md p-4 border-b-2">User : {user.userName}</p>
          <p className="text-gray-800 hover:bg-blue-500 hover:text-white p-4 border-b-2">Email : {user.userEmail}</p>
          <p className="text-gray-800 hover:bg-blue-500 hover:text-white p-4 border-b-2">Role : {user.roleName}</p>
          {/* Add more user information as needed */}
          <p className="text-gray-600 hover:bg-blue-500 hover:text-white p-4 border-b-2">
          <button
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Logout
          </button>
          </p>
          <p className="text-gray-600 p-2 bg-slate-100 rounded-b-md">Last Login: Feb 28 2024 8:31PM</p>
        </div>
      )}
    </div>
  );
};

export default ProfileDataPopup;
