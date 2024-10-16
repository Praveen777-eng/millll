import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Updated import
import './BasicNavbar.css';
 
function BasicNavbar({ userName, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
 
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 
  const isActive = (path) => location.pathname === path;
 
  return (
    <nav className="admin-navbar-b25">
      <div className="navbar-content-b25">
        <div className="user-name-b25">Welcome {userName}</div>
        <div className="menu-buttons-b25">
          <Link to="/bbrands" className={`menu-button-b25 ${isActive('/bbrands') ? 'active' : ''}`}>Home</Link>
          <Link to="/bsupplier" className={`menu-button-b25 ${isActive('/bsupplier') ? 'active' : ''}`}>Supplier</Link>
          <Link to="/bView-Cart" className={`menu-button-b25 ${isActive('/bView-Cart') ? 'active' : ''}`}>Cart</Link>
          <Link to="/border-history" className={`menu-button-b25 ${isActive('/border-history') ? 'active' : ''}`}>Order History</Link>
         
          <div className="profile-icon-b25" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} size="xl" />
            {dropdownOpen && (
              <div className="dropdown-b25">
                <div className="dropdown-item-b25">{userName}</div>
                <div className="dropdown-item-b25" onClick={onLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
 
export default BasicNavbar;