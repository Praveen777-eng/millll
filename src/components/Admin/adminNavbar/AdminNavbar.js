import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Updated import
import './AdminNavbar.css';

function AdminNavbar({ userName, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="admin-navbar">
      <div className="navbar-content">
        <div className="user-name">Welcome {userName}</div>
        <div className="menu-buttons">
          <Link to="/Admin-Home" className={`menu-button ${isActive('/Admin-Home') ? 'active' : ''}`}>Home</Link>
          <Link to="/brands" className={`menu-button ${isActive('/brands') ? 'active' : ''}`}>Brands</Link>
          <Link to="/customer-data" className={`menu-button ${isActive('/customer-data') ? 'active' : ''}`}>Suppliers</Link>
          <Link to="/order-history" className={`menu-button ${isActive('/order-history') ? 'active' : ''}`}>Order History</Link>
          
          <div className="profile-icon" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} size="xl" />
            {dropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-item">{userName}</div>
                <div className="dropdown-item" onClick={onLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
