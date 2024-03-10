import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Category from './Component/Category';
import Product from './Component/Product';
import Home from './Component/Home';
import Login from './Component/Login';
import Landing from './Component/Landing';
import SignUp from './Component/SignUp';
import NotFound from './HelperComponents/NotFound';
// import Test from './Test';
import Layout from './Layout';
import PrivateRoute from './PrivateRouter'; // Import the PrivateRoute component

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Ecom/*" element ={<Layout />}>
              <Route path="home" element={<PrivateRoute element={<Home />} />}  />
              <Route path="home/category" element={<PrivateRoute element={<Category />} />} />
              <Route path="home/product" element={<PrivateRoute element={<Product />} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
