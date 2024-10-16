import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BasicCheckout.css'; // Import the CSS file
 
const BasicCheckout = () => {
  const location = useLocation();
  const { cart, totalPrice } = location.state || {};
  const navigate = useNavigate();
 
  const handleInvoiceClick = async () => {
    const invoiceData = {
      supplierName: "Supplier Name Here",
      customerName: "8888888888",
      customerMobileNumber: "",
      invoiceDate: new Date().toISOString().split('T')[0],
      price: totalPrice.toString(),
    };
 
    try {
      const response = await fetch('https://prasad-gz5p.onrender.com/api/invoices/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
 
      const data = await response.json();
      navigate(`/binvoice/${data.id}`);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };
 
  return (
    <div className="checkoutb27">
      <h1>Checkout</h1>
      {cart && cart.length > 0 ? (
        <>
          <h2>Your Cart Items:</h2>
          {cart.map((item, index) => (
            <div className="cart-itemb27" key={index}>
              Product ID: {item.id} - Price: ₹{item.price} - Quantity: 1 - Total: ₹{item.price}
            </div>
          ))}
          <div className="total-priceb27">Total Price: ₹{totalPrice}</div>
          <button onClick={handleInvoiceClick}>Invoice</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};
 
export default BasicCheckout;