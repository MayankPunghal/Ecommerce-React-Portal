import React from 'react';
import { Link } from 'react-router-dom'; // Import useNavigate

const Home = () => {

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Admin Portal</h2>
      <div className="flex justify-center items-center">
        <div className="p-4">
          <Link to="category" className="text-blue-500 hover:underline">
            Categories
          </Link>
        </div>
        <div className="p-4">
          <Link to="product" className="text-blue-500 hover:underline">
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;