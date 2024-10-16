// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../Navbar/Navbar';
// import './CustomerHome.css';
// import Brands from '../Brands/Brands';
// import CustomersData from '../CustomerData/CustomersData';
// import Supplier from '../Supplier/Supplier';

// const CustomerHome = () => {

//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('Super Suppliers');
//   const [superSupplierExpanded, setSuperSupplierExpanded] = useState(false);
//   const [supplierExpanded, setSupplierExpanded] = useState(false);
//   const [customerExpanded, setCustomerExpanded] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   const navigate = useNavigate();
 
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
 
//     if (!token) {
//       navigate('/login');
//       return;
//     }
 
//   }, [navigate]);
 
 
// if (error) {
//     return <div className="error-message">Error: {error}</div>;
// }
 
// const handleSectionClick = section => {
//   setActiveSection(section);
// };

// return (
//   <div className="customer-home1">
//     <div className="customer-home">
 
    
 
//       {error && <p className="error-message">{error}</p>}
 
//       <div className="section-buttons">
//         <button
//           onClick={() => handleSectionClick('Super Suppliers')}
//           className={`btn-section ${activeSection === 'Super Suppliers' ? 'active' : ''}`}
//         >
//           Supplier to Supplier
//         </button>
//         <button
//           onClick={() => handleSectionClick('Suppliers')}
//           className={`btn-section ${activeSection === 'Suppliers' ? 'active' : ''}`}
//         >
//           Supplier to Customer
//         </button>
//       </div>
 
//       <div className="sections-wrapper">
 
//           {activeSection === 'Super Suppliers' && (
//             <>
//               <div className={`superSupplier-section ${superSupplierExpanded ? 'expanded' : 'collapsed'}`}>
//                 <Brands />
//               </div>
                
//           <div className={`supplier-section ${supplierExpanded ? 'expanded' : 'collapsed'}`}>
           
//            <Supplier/>
//           </div>
//             </>
//         )}
                  
//         {activeSection === 'Suppliers' && (

//           <>
//           <div className={`superSupplier-section ${superSupplierExpanded ? 'expanded' : 'collapsed'}`}>
//                 <Brands />
//                 </div>
        
//           <div className={`customer-section ${customerExpanded ? 'expanded' : 'collapsed'}`}>
          
//           <CustomersData/>
//           </div>
//           </>
//         )}
  
//       </div>
//     </div>
//   </div>
// );
// }
// export default CustomerHome;

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import './CustomerHome.css';

const Brands = lazy(() => import('../Brands/Brands'));
const Supplier = lazy(() => import('../Supplier/Supplier'));
const CustomersData = lazy(() => import('../CustomerData/CustomersData'));

const CustomerHome = () => {
  const [error] = useState(null);
  const [activeSection, setActiveSection] = useState('Supplier-Supplier');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const handleSectionClick = section => {
    setActiveSection(section);
  };

  return (
    <div className="customer-home122">
      <div className="customer-home22">
        {error && <p className="error-message22">{error}</p>}
        <div className="section-buttons22">
          <button
            onClick={() => handleSectionClick('Supplier-Supplier')}
            className={`btn-section22 ${activeSection === 'Supplier-Supplier' ? 'active' : ''}`}
          >
            Supplier to Supplier
          </button>
          <button
            onClick={() => handleSectionClick('Supplier-Customer')}
            className={`btn-section22 ${activeSection === 'Supplier-Customer' ? 'active' : ''}`}
          >
            Supplier to Customer
          </button>
        </div>

        <div className="sections-wrapper22">
          <Suspense fallback={<div>Loading...</div>}>
            {activeSection === 'Supplier-Supplier' && (
              <>
                <div className="brand-section22">
                  <Brands />
                </div>
                <div className="supplier-section22">
                  <Supplier />
                </div>
              </>
            )}

            {activeSection === 'Supplier-Customer' && (
              <>
                <div className="brand-section22">
                  <Brands />
                </div>
                <div className="customer-section22">
                  <CustomersData />
                </div>
              </>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
