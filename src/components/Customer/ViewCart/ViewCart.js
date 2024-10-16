


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ViewCart.css';
import DotSpinner from '../DotSpinner/DotSpinner';

const Cart = () => {
  const [cart11, setCart11] = useState([]);
  const [customerDetails11, setCustomerDetails11] = useState({ username: '', mobile_number: '' });
  const [error11, setError11] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantityMap, setQuantityMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomerDetails();
    fetchCart11();
  }, []);

  const fetchCustomerDetails = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('https://prasad-gz5p.onrender.com/api/user/details/', {
        headers: { 'Authorization': `Token ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch customer details`);
      }

      const data = await response.json();
      setCustomerDetails11({ username: data.username, mobile_number: data.mobile_number });
    } catch (error) {
      setError11(error.message);
    }
  };

  const fetchCart11 = async () => {
    const token = localStorage.getItem('authToken');
    const mobileNumber = customerDetails11.mobile_number;

    try {
      setLoading(true);
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/view-cart/?mobile=${mobileNumber}`, {
        headers: { 'Authorization': `Token ${token}` },
      });

      if (!response.ok) throw new Error(`Failed to fetch cart`);
      const cartData = await response.json();
      setCart11(cartData.cart_items || []);
      const initialQuantities = {};
      cartData.cart_items.forEach(item => {
        initialQuantities[item.productItem.productid] = item.quantity;
      });
      setQuantityMap(initialQuantities);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeQuantity11 = async (productId, quantity) => {
    const token = localStorage.getItem('authToken');
    const dataToSubmit = { product_id: productId, quantity };

    try {
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/replace-quantity/${productId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) throw new Error(`Failed to update cart: ${response.statusText}`);
      setQuantityMap(prev => ({ ...prev, [productId]: quantity }));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  

  const handleDeleteItemCart11 = async (productId) => {
    const token = localStorage.getItem('authToken');
  
    try {
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/remove-entire-from-cart/${productId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error(`Failed to remove item from cart: ${response.statusText}`);
      
      // Remove the item from the cart in state without re-fetching
      setCart11(prevCart => prevCart.filter(item => item.productItem.productid !== productId));
      
      // alert('Product removed from cart successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };
  

  const calculateTotalPrice = () => {
    return cart11.reduce((total, item) => {
      const quantity = quantityMap[item.productItem.productid] || item.quantity; // use quantityMap for current quantities
      return total + (item.price * quantity);
    }, 0);
  };

  const checkout11 = async () => {
    const token = localStorage.getItem('authToken');
    const mobileNumber = customerDetails11.mobile_number;
    const volume = 10; // Replace with actual volume value

    try {
      const response = await fetch('https://prasad-gz5p.onrender.com/api/checkout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile_number: mobileNumber, volume }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Checkout failed: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      alert(`Checkout successful! Invoice ID: ${result.invoice_id}`);
      setCart11([]);
      setQuantityMap({});
    } catch (error) {
      setError11(error.message);
      console.error('Checkout Error:', error);
    }
  };

  return (
    <div>
      <div className="cart-container11">
        {loading ? (<>
         <div className='cart-spinner11'><DotSpinner /> </div> 
          </>
        ) : (
          <>
            <h2>Your Cart</h2>
            <div className="btns-total"> 
            <p className='view-cart-total11'>Total Price: ₹{calculateTotalPrice()}</p>
            <div className='btnMain11'>
                <button onClick={fetchCart11} className='view-cart-button11'>Refresh Cart</button>
                <button onClick={checkout11} className='view-cart-button11-checkout' disabled={cart11.length === 0}>Checkout</button>
                <button onClick={() => navigate('/order-history')} className='view-cart-button11'>Order History</button>
              </div>
            </div>
            <div className="cart-section11">
              {cart11.length > 0 ? (
                <ul>
                  {cart11.map((item) => (
                    item && item.productItem && (
                      <li key={item.productItem.productid}>
                        <div className='view-cart-item11'>
                          <div className='image_container11'>
                          
                        <img
                          src={item.productItem?.productImage }
                         // src={ 'https://cdn.britannica.com/34/176234-050-0E0C55C6/Glass-milk.jpg'}
                          alt={item.product_name}
                          className="image333"
                          
                        />
                          </div>
                          <div><strong>Category: {item.productItem?.productCategory || 'N/A'}</strong></div>
                        <div className='volumev210'>Type: {item.productItem?.productType || 'N/A'}</div>
                        <div className='volumev210'>Volume: {item.productItem?.productVolume || 'N/A'}</div>
                          <div>Price of Product: ₹{item.price}</div>
                          <div style={{ display: 'flex', alignItems: 'center' ,marginRight:"20px"}}>
                           

<span>{item.product_name} Quantity: </span>
    <input
      type="number"
      min="1"
      value={quantityMap[item.productItem.productid] || item.quantity}
      onChange={(e) => {
        const quantity = parseInt(e.target.value) || 1; 
        handleChangeQuantity11(item.productItem.productid, quantity);
      }}
      style={{ width: '60px', marginLeft: '10px' }} // Changed marginRight to marginLeft
    />
                            
                          </div>
                          <div>Total Price of Product: ₹{item.price * (quantityMap[item.productItem.productid] || item.quantity)}</div>
                          <button className='icon-remove11' onClick={() => handleDeleteItemCart11(item.productItem.productid)}>
                            <FontAwesomeIcon icon={faTrash} /> Remove
                          </button>
                        </div>
                      </li>
                    )
                  ))}
                </ul>
              ) : (
                <p>Your cart is empty</p>
              )}

              

              {error11 && <p className="error11">{error11}</p>}
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;





