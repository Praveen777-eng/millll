import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BasicOrderHistory.css';
import DotSpinner from '../BasicDotSpinner/BasicDotSpinner';
 
const BasicOrderHistory = () => {
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
    <div className="order-historyb24">
      <div className='order-history-containerb24'>
        <p className="order-history-title-b24">Your Order History</p>
        <button onClick={() => navigate('/bbrands')} className="back-button999b24">
          Back to Home
        </button>
      </div>
      <div className='order-history1b24'>
        {loading ? (
          <div className='order-spinnerb24'><DotSpinner /></div>
        ) : (
          <>
            {error && <p className="error-messageb24">{error}</p>}
            {orderDetails.length > 0 ? (
              <>
                <table className="order-tableb24">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Price of Products</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((item, index) => (
                      <tr key={index} className="order-itemb24">
                        <td>{item.id}</td>
                        <td>₹{item.price}</td>
                        <td>
                          <button
                            className="view-invoice-buttonb24"
                            onClick={() => handleViewInvoice(item.id)}
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-controlsb24">
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
  <div className="modal-overlayb24" onClick={closeModal}>
    <div className="modal-contentb24" onClick={(e) => e.stopPropagation()}>
      <h2>Invoice Details</h2>
      {invoiceData && (
        <>
          <h3>Invoice ID: {invoiceData.invoice_id}</h3>
          <table className="invoice-tableb24">
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
      <button className="close-buttonb24" onClick={closeModal}>Close</button>
    </div>
  </div>
)}
 
    </div>
  );
};
 
export default BasicOrderHistory;