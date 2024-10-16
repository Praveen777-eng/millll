// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './OrderHistory.css';
// import DotSpinner from '../DotSpinner/DotSpinner';
 
// const OrderHistory = () => {
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
 
//   const fetchOrder = async () => {
//     const token = localStorage.getItem('authToken');
 
//     try {
//       const response = await fetch(`https://prasad-gz5p.onrender.com/api/order-history/`, {
//         headers: { 'Authorization': `Token ${token}` },
//       });
 
//       if (!response.ok) {
//         throw new Error(`Failed to fetch order history`);
//       }
 
//       const orderData = await response.json();
//       setOrderDetails(orderData.orders || []);
//       setError(null);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false); // Set loading to false after fetching
//     }
//   };
 
//   const viewInvoice = async (orderId) => {
//     const token = localStorage.getItem('authToken');
//     try {
//       const response = await fetch(`https://prasad-gz5p.onrender.com/api/view-invoice/${orderId}/`, {
//         headers: { 'Authorization': `Token ${token}` },
//       });
 
//       if (!response.ok) {
//         throw new Error(`Failed to get Invoice`);
//       }
 
//       const invoiceData = await response.json();
//       console.log(invoiceData.items);
//       setError(null);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//     }
//   };
 
//   const handleViewInvoice = (orderId) => {
//     viewInvoice(orderId);
//     navigate(`/invoice`); // Navigate to the invoice page
//   };
 
//   useEffect(() => {
//     fetchOrder(); // Fetch order history on component mount
//   }, []); // Empty dependency array ensures it runs only once
 
//   return (
//     <div className="order-history">
//       <div className='order-history-container'>
//       <h2>Your Order History</h2>
//       <button onClick={() => navigate('/customer-home')} className="back-button999">
//         Back to Home
//       </button>
//       </div>
//       <div className='order-history1'>
//       {loading ? (
//         <>
//         <div className='order-spinner-123'> <DotSpinner /> </div>
//         </>
        
//       ) : (
       
//         <>
        
//           {error && <p className="error-message">{error}</p>}
//           {orderDetails.length > 0 ? (
//             <ul className="order-list">
//               {orderDetails.map((item, index) => (
//                 <li key={index} className="order-item">
//                   <div className="order-info">
//                     <div>Order ID: {item.id}</div>
//                     <div>Price of Products: ₹{item.price}</div>
//                     <button
//                       className="view-invoice-button"
//                       onClick={() => handleViewInvoice(item.id)}
//                     >
//                       View Invoice
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>Your order history is empty</p>
//           )}
         
//         </>
//       )}  
//     </div>
//     </div>
//   );
// };
 
// export default OrderHistory;
 
 



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';
import DotSpinner from '../DotSpinner/DotSpinner';
 
const OrderHistory = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of items to display per page
  const navigate = useNavigate();
 
  const fetchOrder = async () => {
    const token = localStorage.getItem('authToken');
 
    try {
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/order-history/`, {
        headers: { 'Authorization': `Token ${token}` },
      });
 
      if (!response.ok) {
        throw new Error(`Failed to fetch order history`);
      }
 
      const orderData = await response.json();
      // Reverse the order data to show newest first
      setOrderDetails(orderData.orders ? orderData.orders.reverse() : []);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  const viewInvoice = async (orderId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/view-invoice/${orderId}/`, {
        headers: { 'Authorization': `Token ${token}` },
      });
 
      if (!response.ok) {
        throw new Error(`Failed to get Invoice`);
      }
 
      const invoiceData = await response.json();
      setInvoiceData(invoiceData);
      setModalOpen(true);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };
 
  const handleViewInvoice = (orderId) => {
    viewInvoice(orderId);
  };
 
  const closeModal = () => {
    setModalOpen(false);
    setInvoiceData(null);
  };
 
  // Pagination Logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orderDetails.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orderDetails.length / itemsPerPage);
 
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
 
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
 
  useEffect(() => {
    fetchOrder(); // Fetch order history on component mount
  }, []);
 
  return (
    <div className="order-historyV890">
      <div className='order-history-containerV890'>
        <p className="order-history-title-V890">Your Order History</p>
        <button onClick={() => navigate('/customer-home')} className="back-button999V890">
          Back to Home
        </button>
      </div>
      <div className='order-history1V890'>
        {loading ? (
          <div className='order-spinner'><DotSpinner /></div>
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}
            {orderDetails.length > 0 ? (
              <>
                <table className="order-tableV890">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Price of Products</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((item, index) => (
                      <tr key={index} className="order-itemV890">
                        <td>{item.id}</td>
                        <td>₹{item.price}</td>
                        <td>
                          <button
                            className="view-invoice-buttonV890"
                            onClick={() => handleViewInvoice(item.id)}
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-controls">
                  <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p>Your order history is empty</p>
            )}
          </>
        )}
      </div>
 
      {/* Modal for displaying invoice details */}
      {modalOpen && (
  <div className="modal-overlayV890" onClick={closeModal}>
    <div className="modal-contentV890" onClick={(e) => e.stopPropagation()}>
      <h2>Invoice Details</h2>
      {invoiceData && (
        <>
          <h3>Invoice ID: {invoiceData.invoice_id}</h3>
          <table className="invoice-tableV890">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.slice().reverse().map((item, index) => (
                <tr key={index}>
                  <td>{item.product_id}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <button className="close-buttonV890" onClick={closeModal}>Close</button>
    </div>
  </div>
)}
 
    </div>
  );
};
 
export default OrderHistory;
