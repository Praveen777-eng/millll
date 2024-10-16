import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faIndustry, faHistory } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import './AdminHome.css';

function AdminHome() {
  

  return (
    <div className="admin-home">
      
      {/* <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1> */}
      <div className="card-container">
        <div className="card009">
          <FontAwesomeIcon icon={faTags} size="3x" className="fa-icon009" />
          <h2>Brands</h2>
          <Link to="/brands" className="card-button009">Brands</Link>
        </div>
        <div className="card009">
          <FontAwesomeIcon icon={faIndustry} size="3x" className="fa-icon009" />
          <h2>Suppliers</h2>
          <Link to="/customer-data" className="card-button009">Suppliers</Link>
        </div>
        <div className="card009">
          <FontAwesomeIcon icon={faHistory} size="3x" className="fa-icon009" />
          <h2>Order History</h2>
          <Link to="/order-history" className="card-button009">Orders</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
