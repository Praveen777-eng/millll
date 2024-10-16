import React, { useEffect, useState } from 'react';


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../Customer/Register/Register';
import Login from '../Customer/Login/Login';
// import PaymentPage from './PaymentPage/PaymentPage.js';

import BasicViewCart from './BasicViewCart/BasicViewCart';
import BasicCheckout from './BasicCheckout/BasicCheckout';
import BasicInvoice from './BasicInvoice/BasicInvoice';
import BasicNavbar from './BasicNavbar/BasicNavbar';

import BasicBrands from './BasicBrands/BasicBrands';
//import ProductList from './ProductList/ProductList';
import BasicSupplier from './BasicSupplier/BasicSupplier';
import BasicOrderHistory from './BasicOrderHistory/BasicOrderHistory';

const BasicApp = () => {
  const [customerDetails, setCustomerDetails] = useState({ username: '', mobile_number: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [error, setError] = useState(null);
 
  const fetchCustomerDetails = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('https://prasad-gz5p.onrender.com/api/user/details/', {
        headers: { 'Authorization': `Token ${token}` },
      });
 
      if (!response.ok) {
        throw new Error(`Failed to fetch customer details`);
      }
 
      const data = await response.json();
      setCustomerDetails({ username: data.username, mobile_number: data.mobile_number });
    } catch (error) {
      setError(error.message);
    }
  };
 
  useEffect(() => {
    if (isAuthenticated) {
      fetchCustomerDetails();
    }
  }, [isAuthenticated]);
 
  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
 
    try {
      await fetch('https://prasad-gz5p.onrender.com/api/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      localStorage.removeItem('authToken');
      setIsAuthenticated(false); // Update authentication state
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
 
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
 
  return (
    <>
      {isAuthenticated && (
        <BasicNavbar  
          userName={customerDetails.username}
          onLogout={handleLogout}
          clasName="nav-styles"
        />
      )}
    
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/bbrands" : "/login"} />} /> {/* Redirect to register */}
        <Route path="/login" element={ isAuthenticated ? <Navigate to="/bbrands" /> :   <Login  onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bbrands" element={isAuthenticated ? <BasicBrands /> : <Navigate to="/login" />} />

        <Route path="/border-history" element={isAuthenticated ? <BasicOrderHistory/>:<Navigate to="/login" /> } /> {/* Customer Order History */}
        <Route path="/bView-Cart" element={isAuthenticated ? <BasicViewCart />:<Navigate to="/login" />} />
        <Route path="/bcheckout" element={isAuthenticated ? <BasicCheckout />:<Navigate to="/login" />} />
        <Route path="/binvoice" element={isAuthenticated ? <BasicInvoice />:<Navigate to="/login" />} />
        <Route path="/bnavbar" element={isAuthenticated ?<BasicNavbar />:<Navigate to="/login" />} /> {/* Navbar */}

        {/* <Route path="/payment" element={<PaymentPage />} /> Payment */}
        <Route path="/bsupplier" element={isAuthenticated ?<BasicSupplier/>:<Navigate to="/login" />} />
        {/* <Route path="/products" element={isAuthenticated ? <ProductList />:<Navigate to="/login" />} />  */}

      </Routes>
    </>
  );
};
 
export default BasicApp;
 