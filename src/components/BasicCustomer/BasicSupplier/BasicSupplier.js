import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BasicSupplier.css';
import DotSpinner from '../BasicDotSpinner/BasicDotSpinner';

const BasicSupplier = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState({ mobile_number: '' });
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingSupplierData, setLoadingSupplierData] = useState(false);
  const [loadingCustomerProducts, setLoadingCustomerProducts] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchSupplierData = async () => {
      setLoadingSupplierData(true);
      try {
        const response = await fetch('https://prasad-gz5p.onrender.com/api/get-suppliers/', {
          headers: { 'Authorization': `Token ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch supplier data`);
        }
        const data = await response.json();
        const suppliers = data.suppliers || [];
        setSupplierData(suppliers);
        setFilteredSuppliers(suppliers);
      } catch (error) {
        setError(error.message);
      }
      finally {
        setLoadingSupplierData(false);
      }
    };
    fetchSupplierData();
  }, [navigate]);

  useEffect(() => {
    const filtered = supplierData.filter(supplier =>
      supplier.includes(searchQuery) // Search by mobile number
    );
    setFilteredSuppliers(filtered);
  }, [searchQuery, supplierData]);

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier({ mobile_number: supplier });
    setDropdownOpen(false);
  };

  const fetchProducts = async (supplierMobile) => {
    const token = localStorage.getItem('authToken');
    setLoadingCustomerProducts(true);
    try {
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/productslist/?supplier=${supplierMobile}`, {
        headers: { 'Authorization': `Token ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products`);
      }

      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    }
    finally {
      setLoadingCustomerProducts(false);
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const handleSupplierSubmit = async () => {
    const token = localStorage.getItem('authToken');

    const payload = {
      supplier_mobile_number: selectedSupplier.mobile_number,

    };

    try {
      const response = await fetch('https://prasad-gz5p.onrender.com/api/select-supplier/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setSnackbarMessage('Please Select supplier.');
        setTimeout(() => setSnackbarMessage(''), 3000);
        return;
      }

      setSnackbarMessage('Supplier details submitted successfully!');
      setTimeout(() => setSnackbarMessage(''), 3000);

      await fetchProducts(selectedSupplier.supplier);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddToCart = async (productId, quantity, price) => {
    console.log("Adding to cart:", { product_id: productId, quantity, price });
    const frice = parseInt(price);
    const token = localStorage.getItem('authToken');

    const dataToSubmit = {
      product_id: productId,
      quantity: quantity,
      price: frice
    };

    try {
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/add-to-cart/${productId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error(`Failed to add to cart: ${response.statusText}`);
      }
      setSnackbarMessage('Product added to cart successfully!');
      setTimeout(() => setSnackbarMessage(''), 3000);

    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleQuantityChange = (productId, change) => {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantityInput.value) || 1;
    currentQuantity += change;
    if (currentQuantity < 1) {
      currentQuantity = 1;
    }
    quantityInput.value = currentQuantity;
  };

  const handleResetSelection1 = () => {
    setSelectedSupplier({ mobile_number: '' });
    setProducts([]);
  };
  return (
    <div className="supplier-homebsz84">
      {error && <p className="error-messagebsz84">{error}</p>}
      {snackbarMessage && (
        <div className="snackbar show">
          {snackbarMessage}
        </div>
      )}
      <h2 className='sup-headbsz84'>Suppliers</h2>
      <div className="supplier-sectionbsz84">
        <div className="dropdownbsz84" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-togglebsz84">
            {selectedSupplier.mobile_number
              ? `${selectedSupplier.mobile_number}`
              : 'Select a Supplier'}
            {selectedSupplier.mobile_number && (
              <span className="crossmarkbsz84" onClick={(e) => {
                e.stopPropagation();
                handleResetSelection1();
              }}>
                &times;
              </span>
            )}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menubsz84">
              <input
                type="text"
                placeholder="Search by name or mobile number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-inputbsz84"
              />
              <div className="supplier-list-container21">
                {loadingSupplierData ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <div className="loaderbsz84">Loading Suppliers...</div>
                  </div>
                ) : (
                  <ul className="supplier-listbsz84">
                    {filteredSuppliers.length ? (
                      filteredSuppliers.map((supplier, index) => (
                        <li key={index} onClick={() => handleSelectSupplier(supplier)}>
                          {supplier}
                        </li>
                      ))
                    ) : (
                      <p className="no-suppliersbsz84">No suppliers found</p>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
        <button onClick={handleSupplierSubmit} className="btn-submitbsz84">
          Submit Supplier
        </button>
      </div>

      {!selectedSupplier.mobile_number && (
        <div className='n0-selectedbsz84'>
          <p>No Supplier Selected</p>
        </div>
      )}
      {loadingCustomerProducts ? (
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '50vh'
        }}>
          <DotSpinner />
          {/* <p>loading....</p> */}
        </div>
      ) : products.length > 0 && (
        <div className="product-card-containerbsz84">
          {products.map((product, index) => (
            <div key={index} className="cardbsz84">
              <div className="image_containerbsz84">
                <img src={product.image_url} alt={product.description} className="imagebsz84" />
              </div>
              <div className="bottom-sectionbsz84">
                <div className="titlebsz84">
                  <p><span>{product.category}</span></p>
                </div>
                <div className="descriptionbsz84">
                  <p>{product.description}</p>
                </div>
                <div className="volumebsz84">
                  <span className="qty">Volume: <span className="volume-valuebsz84">{product.volume}</span></span>
                </div>
                <div className="quantitybsz84">
                  <span className="qty">Quantity</span>
                  <button className="volume-buttonbsz84" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="inputBoxbsz84"
                    id={`quantity-${product.id}`}
                  />
                  <button className="volume-buttonbsz84" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                </div>
                <div className="actionbsz84">
                  <div className="pricebsz84">
                    <span>₹{product.Final_Price}</span>
                  </div>
                  <button className="cart-buttonbsz84" onClick={() => {
                    const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value) || 1;
                    handleAddToCart(product.id, quantity, product.Final_Price);
                  }}>
                    <svg className="cart-iconbsz84" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default BasicSupplier;
