






import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load components
const Login = lazy(() => import('./components/Customer/Login/Login'));
const AdminApp = lazy(() => import('./components/Admin/AdminApp'));
const CustomerApp = lazy(() => import('./components/Customer/CustomerApp'));
const BasicApp = lazy(() => import('./components/BasicCustomer/BasicApp'));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

          {isAuthenticated ? (
            <>
              {userRole === 'admin' ? (
                <Route path="/*" element={<AdminApp />} />
              ) : userRole === 'customer' ? (
                <Route path="/*" element={<CustomerApp />} />
              ) : userRole === 'BasicCustomer' ? (
                <Route path="/*" element={<BasicApp />} />
              ) : (
                <Route path="/" element={<Navigate to="/login" />} />
              )}
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;


