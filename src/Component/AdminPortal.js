import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminPortal = () => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Admin Portal</h2>

      <div className="flex justify-center items-center">
        <div className="p-4">
          <Link to="/category" className="text-blue-500 hover:underline">
            Categories
          </Link>
        </div>
        <div className="p-4">
          <Link to="/product" className="text-blue-500 hover:underline">
            Products
          </Link>
        </div>
        {/* Add more links as needed */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
