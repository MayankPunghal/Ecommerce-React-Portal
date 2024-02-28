import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Admin Portal</h2>
      <div className="flex justify-center items-center">
        <div className="p-4">
        <Link to="category"className="border border-gray-300 p-6 rounded-md hover:shadow-md transition duration-300 hover:bg-blue-600 hover:text-white">
              Categories
            </Link>
        </div>
        <div className="p-4">
        <Link to="product" className="border border-gray-300 p-6 rounded-md hover:shadow-md transition duration-300 hover:bg-blue-600 hover:text-white">
              Products
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
