import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-orange-600">404 - Not Found</h2>
        <p className="text-red-400 text-2xl">The page you are looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
