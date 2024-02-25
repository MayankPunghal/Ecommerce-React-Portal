import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Category from './Component/Category';
import Product from './Component/Product';
import Home from './Component/Home';
import Login from './Component/Login';
import Landing from './Component/Landing';
import SignUp from './Component/SignUp';
import Test from './Test';
import PrivateRoute from './PrivateRouter'; // Import the PrivateRoute component

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/category" element={<PrivateRoute element={<Category />} />} />
        <Route path="/product" element={<PrivateRoute element={<Product />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Landing />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
