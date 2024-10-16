import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faBoxOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import './TabNavigation.css';
 
const TabNavigation = () => {
  const navigate = useNavigate();
 
  const handleNavigate = (path) => {
    navigate(path);
  };
 
  return (
    <div className="tab-navigation">
      <button onClick={() => handleNavigate('/home')} className="tab-button">
        <FontAwesomeIcon icon={faHome} className="tab-icon" />
        Home
      </button>
      <button onClick={() => handleNavigate('/categories')} className="tab-button">
        <FontAwesomeIcon icon={faList} className="tab-icon" />
        Categories
      </button>
      <button onClick={() => handleNavigate('/myorders')} className="tab-button">
        <FontAwesomeIcon icon={faBoxOpen} className="tab-icon" />
        My Orders
      </button>
      <button onClick={() => handleNavigate('/profile')} className="tab-button">
        <FontAwesomeIcon icon={faUser} className="tab-icon" />
        Profile
      </button>
    </div>
  );
};
 
export default TabNavigation;