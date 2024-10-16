import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faBoxOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import './BasicTabNavigation.css';
 
const BasicTabNavigation = () => {
  const navigate = useNavigate();
 
  const handleNavigate = (path) => {
    navigate(path);
  };
 
  return (
    <div className="tab-navigationb32">
      <button onClick={() => handleNavigate('/home')} className="tab-buttonb32">
        <FontAwesomeIcon icon={faHome} className="tab-iconb32" />
        Home
      </button>
      <button onClick={() => handleNavigate('/categories')} className="tab-buttonb32">
        <FontAwesomeIcon icon={faList} className="tab-iconb32" />
        Categories
      </button>
      <button onClick={() => handleNavigate('/myorders')} className="tab-buttonb32">
        <FontAwesomeIcon icon={faBoxOpen} className="tab-iconb32" />
        My Orders
      </button>
      <button onClick={() => handleNavigate('/profile')} className="tab-buttonb32">
        <FontAwesomeIcon icon={faUser} className="tab-iconb32" />
        Profile
      </button>
    </div>
  );
};
 
export default BasicTabNavigation;