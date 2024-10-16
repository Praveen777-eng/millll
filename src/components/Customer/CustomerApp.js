// import React, { useEffect, useState } from 'react';



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Register from '../Customer/Register/Register';
// import CustomerHome from '../Customer/CustomerHome/CustomerHome';
// import Login from '../Customer/Login/Login';
// // import PaymentPage from './components/PaymentPage/PaymentPage.js';
// //import SupplierCustomerHome from './SupplierCustomerHome';


// import ViewCart from '../Customer/ViewCart/ViewCart';
// import Checkout from '../Customer/Checkout/Checkout';
// import Invoice from '../Customer/Invoice/Invoice';
// import Navbar from '../Customer/Navbar/Navbar';

// import Brands from '../Customer/Brands/Brands';
// import ProductList from '../Customer/ProductList/ProductList';
// import Supplier from '../Customer/Supplier/Supplier';
// import OrderHistory from '../Customer/OrderHistory/OrderHistory';

// const CustomerApp = () => {
//   const [customerDetails, setCustomerDetails] = useState({ username: '', mobile_number: '' });
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
//   const [error, setError] = useState(null);
 
//   const fetchCustomerDetails = async () => {
//     const token = localStorage.getItem('authToken');
//     try {
//       const response = await fetch('https://prasad-gz5p.onrender.com/api/user/details/', {
//         headers: { 'Authorization': `Token ${token}` },
//       });
 
//       if (!response.ok) {
//         throw new Error(`Failed to fetch customer details`);
//       }
 
//       const data = await response.json();
//       setCustomerDetails({ username: data.username, mobile_number: data.mobile_number });
//     } catch (error) {
//       setError(error.message);
//     }
//   };
 
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchCustomerDetails();
//     }
//   }, [isAuthenticated]);
 
//   const handleLogout = async () => {
//     const token = localStorage.getItem('authToken');
 
//     try {
//       await fetch('https://prasad-gz5p.onrender.com/api/logout/', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Token ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       localStorage.removeItem('authToken');
//       setIsAuthenticated(false); // Update authentication state
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };
 
//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };
 
//   return (
//     <>
//       {isAuthenticated && (
//         <Navbar  
//           userName={customerDetails.username}
//           onLogout={handleLogout}
//           className="nav-styles"
//         />
//       )}
   
//       <Routes>
//         <Route path="/" element={<Navigate to={isAuthenticated ? "/customer-home" : "/login"} />} />
//         <Route path="/login" element={isAuthenticated ? <Navigate to="/customer-home" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
//         <Route path="/register" element={ <Register/> } />
//         <Route path="/customer-home" element={isAuthenticated ? <CustomerHome /> : <Navigate to="/login" />} />
//         <Route path="/order-history" element={isAuthenticated ? <OrderHistory /> : <Navigate to="/login" />} />
//         <Route path="/view-cart" element={isAuthenticated ? <ViewCart /> : <Navigate to="/login" />} />
//         <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} />
//         <Route path="/invoice" element={isAuthenticated ? <Invoice /> : <Navigate to="/login" />} />
//         <Route path="/supplier" element={isAuthenticated ? <Supplier /> : <Navigate to="/login" />} />
//         <Route path="/brands" element={<Brands />} />
//         <Route path="/products" element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} />
//       </Routes>
//     </>
//   );
// };
 
// export default CustomerApp;


import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Register = lazy(() => import('../Customer/Register/Register'));
const CustomerHome = lazy(() => import('../Customer/CustomerHome/CustomerHome'));
const Login = lazy(() => import('../Customer/Login/Login'));
const ViewCart = lazy(() => import('../Customer/ViewCart/ViewCart'));
const Checkout = lazy(() => import('../Customer/Checkout/Checkout'));
const Invoice = lazy(() => import('../Customer/Invoice/Invoice'));
const Navbar = lazy(() => import('../Customer/Navbar/Navbar'));
const Brands = lazy(() => import('../Customer/Brands/Brands'));
const ProductList = lazy(() => import('../Customer/ProductList/ProductList'));
const Supplier = lazy(() => import('../Customer/Supplier/Supplier'));
const OrderHistory = lazy(() => import('../Customer/OrderHistory/OrderHistory'));

const CustomerApp = () => {
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
      <Suspense fallback={<div>Loading...</div>}>
        {isAuthenticated && (
          <Navbar  
            userName={customerDetails.username}
            onLogout={handleLogout}
            className="nav-styles"
          />
        )}

        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/customer-home" : "/login"} />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/customer-home" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer-home" element={isAuthenticated ? <CustomerHome /> : <Navigate to="/login" />} />
          <Route path="/order-history" element={isAuthenticated ? <OrderHistory /> : <Navigate to="/login" />} />
          <Route path="/view-cart" element={isAuthenticated ? <ViewCart /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/invoice" element={isAuthenticated ? <Invoice /> : <Navigate to="/login" />} />
          <Route path="/supplier" element={isAuthenticated ? <Supplier /> : <Navigate to="/login" />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/products" element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default CustomerApp;
