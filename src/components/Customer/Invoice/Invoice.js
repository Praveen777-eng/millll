import React, { useEffect, useState } from 'react';

const Invoice = () => {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null); // State to hold the order ID

  // Function to fetch invoice details
  const fetchInvoiceDetails = async (orderId) => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/view-invoice/${orderId}/`, {
        headers: { 'Authorization': `Token ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoice');
      }

      const invoiceData = await response.json();
      setInvoiceDetails(invoiceData.items || []);
    } catch (err) {
      setError(err.message);
    }
  };

  // Effect to fetch invoice details when orderId is set
  useEffect(() => {
    if (orderId) {
      fetchInvoiceDetails(orderId);
    }
  }, [orderId]);

  // Handle closing the invoice
  const handleCloseInvoice = () => {
    setInvoiceDetails([]);
    setOrderId(null); // Reset orderId when closing
  };

  return (
    <div className="invoice">
      {error && <p className="error">{error}</p>}

      {invoiceDetails.length > 0 ? (
        <div>
          <h3>Order Invoice:</h3>
          <button className="view-cart-button" onClick={handleCloseInvoice}>
            Close Invoice
          </button>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
            {invoiceDetails.map((order, index) => (
              <div key={index} className="product-card">
                <h4>Product ID: {order.product_id}</h4>
                <p>Quantity: {order.quantity}</p>
                <p>Price: ₹{order.total_price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No invoice details available. Please select an order to view.</p>
      )}
    </div>
  );
};

export default Invoice;