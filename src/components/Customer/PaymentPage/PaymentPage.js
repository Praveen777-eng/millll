import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native'; // You can use standard HTML/CSS for React.js
import Razorpay from 'razorpay'; // Import Razorpay SDK for web
 
const PaymentPage = ({ amount }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
 
  useEffect(() => {
    const handlePayment = () => {
      const options = {
        key: 'rzp_test_V6uyOYWtWHniPu',
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Unis Tech',
        description: 'Thank you for your purchase',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV9LDwhOC6eE99PfRo45zz7xMLHNRWxQYN9w&s',
        prefill: {
          name: 'Shiva Nandala',
          email: 'shivanandalas@gmail.com',
          contact: '7569948497',
        },
        theme: {
          color: '#09518e',
        },
      };
 
      const rzp = new Razorpay(options);
      rzp.open();
 
      rzp.on('payment.failed', function (response) {
        console.log('Payment error:', response.error.description, response.error.code);
      });
 
      rzp.on('payment.success', function (response) {
        console.log(`Payment successful: ${response.razorpay_payment_id}`);
        setPaymentSuccess(true);
      });
    };
 
    handlePayment();
  }, [amount]);
 
  return (
<div style={styles.container}>
      {paymentSuccess ? (
<div style={styles.paymentContainer}>
<img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV9LDwhOC6eE99PfRo45zz7xMLHNRWxQYN9w&s'
            style={styles.image}
            alt='Payment Success'
          />
<p style={styles.description}>Thank you for your purchase!</p>
<p style={styles.amount}>Amount: {amount} INR</p>
</div>
      ) : (
<p style={styles.loadingText}>Processing your payment...</p>
      )}
</div>
  );
};
 
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  paymentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
  },
  image: {
    width: '150px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  amount: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  loadingText: {
    fontSize: '18px',
    color: '#09518e',
  },
};
 
export default PaymentPage;