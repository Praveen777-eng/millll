import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './adminNavbar/AdminNavbar';
import ProductList from './adminHome/products/ProductList';
// import AdminRegister from './adminRegister/AdminRegister';
// import AdminLogin from './adminLogin/AdminLogin';
import AdminHome from './adminHome/AdminHome';
import BrandList from './adminHome/brands/BrandList';
import CustomersData from './adminHome/customers/CustomersData';
import OrderHistory from './adminHome/orderHistory/OrderHistory';
import Login from '../Customer/Login/Login';
import Register from '../Customer/Register/Register';

const AdminApp = () => {
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
        <AdminNavbar  
          userName={customerDetails.username}
          onLogout={handleLogout}
   
        />
      )}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/Admin-Home" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/Admin-Home" element={isAuthenticated ? <AdminHome /> : <Navigate to="/login" />} />
        <Route path="/brands" element={isAuthenticated ? <BrandList /> : <Navigate to="/login" />} />
        <Route path="/customer-data" element={isAuthenticated ? <CustomersData /> : <Navigate to="/login" />} />
        <Route path="/order-history" element={isAuthenticated ? <OrderHistory/> : <Navigate to="/login"/>}/>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/Admin-Home" : "/login"} />} />
        <Route path="/products/:brandID" element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};
 
export default AdminApp;
 