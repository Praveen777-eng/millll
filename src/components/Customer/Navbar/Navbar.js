import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Updated import
import './Navbar.css';

function Navbar({ userName, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="admin-navbar-p8">
      <div className="navbar-content-p8">
        <div className="user-name-p8">Welcome {userName}</div>
        <div className="menu-buttons-p8">
          <Link to="/customer-home" className={`menu-button-p8 ${isActive('/customer-home') ? 'active' : ''}`}>Home</Link>
          <Link to="/products" className={`menu-button-p8 ${isActive('/products') ? 'active' : ''}`}>Products</Link>
          <Link to="/View-Cart" className={`menu-button-p8 ${isActive('/View-Cart') ? 'active' : ''}`}>Cart</Link>
          <Link to="/order-history" className={`menu-button-p8 ${isActive('/order-history') ? 'active' : ''}`}>Order History</Link>
         
          <div className="profile-icon-p8" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} size="xl" />
            {dropdownOpen && (
              <div className="dropdown-p8">
                <div className="dropdown-item-p8">{userName}</div>
                <div className="dropdown-item-p8" onClick={onLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
