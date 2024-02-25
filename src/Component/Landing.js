import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to My App!</h2>
        <Link
          to="/login"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Landing;
