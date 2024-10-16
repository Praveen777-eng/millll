import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css'; // Import the CSS file
 
const Checkout = () => {
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
      navigate(`/invoice/${data.id}`);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };
 
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      {cart && cart.length > 0 ? (
        <>
          <h2>Your Cart Items:</h2>
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              Product ID: {item.id} - Price: ₹{item.price} - Quantity: 1 - Total: ₹{item.price}
            </div>
          ))}
          <div className="total-price">Total Price: ₹{totalPrice}</div>
          <button onClick={handleInvoiceClick}>Invoice</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};
 
export default Checkout;
 
 














// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const location = useLocation();
//   const { cart, totalPrice } = location.state || {};
//   const navigate = useNavigate();

//   const handleInvoiceClick = async () => {
//     // Construct the invoice data
//     const invoiceData = {
//       supplierName: "Supplier Name Here",
//       customerName: "8888888888",
//       customerMobileNumber: "",
//       invoiceDate: new Date().toISOString().split('T')[0], // Today's date
//       price: totalPrice.toString(), // Assuming totalPrice is a number
//     };

//     try {
//       const response = await fetch('https://prasad-gz5p.onrender.com/api/invoices/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(invoiceData),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       // Assuming the response returns the invoice ID
//       navigate(`/invoice/${data.id}`); // Redirect to the invoice page with the new ID
//     } catch (error) {
//       console.error('Error creating invoice:', error);
//     }
//   };

//   return (
//     <div className="checkout">
//       <style>
//         {`
//           .checkout {
//             padding: 30px;
//             background-color: #ffffff;
//             border-radius: 10px;
//             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//             max-width: 800px;
//             margin: 20px auto;
//             font-family: Arial, sans-serif;
//           }

//           h1 {
//             color: #2c3e50;
//             margin-bottom: 20px;
//             text-align: center;
//             font-size: 2em;
//           }

//           .cart-item {
//             margin-bottom: 10px;
//           }

//           .total-price {
//             font-weight: bold;
//             margin-top: 20px;
//             text-align: center;
//           }

//           button {
//             padding: 10px;
//             background-color: #007bff;
//             color: white;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//             width: 100%;
//             transition: background-color 0.3s ease;
//           }

//           button:hover {
//             background-color: #0056b3;
//           }
//         `}
//       </style>

//       <h1>Checkout</h1>
//       {cart && cart.length > 0 ? (
//         <>
//           <h2>Your Cart Items:</h2>
//           {cart.map((item, index) => (
//             <div className="cart-item" key={index}>
//               Product ID: {item.id} - Price: ₹{item.price} - Quantity: 1 - Total: ₹{item.price}
//             </div>
//           ))}
//           <div className="total-price">Total Price: ₹{totalPrice}</div>
//           <button onClick={handleInvoiceClick}>
//             Invoice
//           </button>
//         </>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Checkout;