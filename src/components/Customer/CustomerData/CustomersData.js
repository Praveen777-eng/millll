

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DotSpinner from '../DotSpinner/DotSpinner';
 
import './CustomersData.css';
 
function CustomersData() {
    const [customerDetails, setCustomerDetails] = useState({ username: '', mobile_number: '' });
    const [error, setError] = useState(null);
    const [customerData, setCustomerData] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({ id: '', mobile_number: '' });
    const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
    const [customerSearchQuery, setCustomerSearchQuery] = useState('');
    const [customerProducts, setCustomerProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCustomers, setLoadingCustomers] = useState(false); // New loading state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        customer_id: '',
        product_id: '',
        new_price: ''
    });
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const customerDropdownRef = useRef(null);
    const navigate = useNavigate();
 
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (customerDropdownRef.current && !customerDropdownRef.current.contains(event.target)) {
            setCustomerDropdownOpen(false);
          }
        };
   
        document.addEventListener('mousedown', handleClickOutside);
   
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [customerDropdownRef]);
 
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }
 
        const fetchCustomerData = async () => {
            setLoadingCustomers(true); // Start loading
            try {
                const response = await fetch('https://prasad-gz5p.onrender.com/api/manage-negotiated-prices/', {
                    headers: { 'Authorization': `Token ${token}` },
                });
 
                if (!response.ok) {
                    throw new Error(`Failed to fetch customer data`);
                }
 
                const data = await response.json();
                setCustomerData(data.customers);
                setFilteredCustomers(data.customers);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingCustomers(false); // End loading
            }
        };
 
        fetchCustomerDetails();
        fetchCustomerData();
    }, [navigate]);
 
    useEffect(() => {
        const filtered = customerData.filter(customer =>
            customer.mobile_number.includes(customerSearchQuery)
        );
        setFilteredCustomers(filtered);
    }, [customerSearchQuery, customerData]);
 
    const handleSelectCustomer = (customer) => {
        setSelectedCustomer({ id: customer.id, mobile_number: customer.mobile_number });
        setCustomerDropdownOpen(false);
    };
 
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
            setCustomerDetails({ username: data.username, mobile_number: data.mobile_number });
        } catch (error) {
            setError(error.message);
        }
    };
 
    const fetchCustomerProducts = async () => {
        const token = localStorage.getItem('authToken');
        setLoadingProducts(true);
        try {
            const response = await fetch(`https://prasad-gz5p.onrender.com/api/manage-negotiated-prices/?customer=${selectedCustomer.id}`, {
                headers: { 'Authorization': `Token ${token}` },
            });
 
            if (!response.ok) {
                throw new Error(`Failed to fetch customer products`);
            }
 
            const data = await response.json();
            setCustomerProducts(data.products);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingProducts(false);
        }
    };
 
    const handleSubmitCustomer = async () => {
        if (!selectedCustomer.id) {
            alert('Please select a customer before submitting.');
            return;
        }
   
        await fetchCustomerProducts();
    };
 
    // const handleSubmitCustomer = async () => {
    //     if (selectedCustomer.id) {
    //         await fetchCustomerProducts();
    //     }
    // };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
 
        try {
            const response = await fetch('https://prasad-gz5p.onrender.com/api/manage-negotiated-prices/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
 
            if (!response.ok) {
                throw new Error(`Failed to update price`);
            }
 
            setCustomerProducts((prevProducts) => {
                const updatedProducts = prevProducts.map((product) =>
                    product.id === formData.product_id
                        ? { ...product, final_price: formData.new_price }
                        : product
                );
                return updatedProducts;
            });
 
            setPopupMessage('Price updated successfully!');
        } catch (error) {
            setPopupMessage('Error: ' + error.message);
        } finally {
            setIsModalOpen(false);
            setFormData({
                customer_id: '',
                product_id: '',
                new_price: ''
            });
 
            setIsPopupVisible(true);
            setTimeout(() => {
                setIsPopupVisible(false);
            }, 1000);
        }
    };
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
 
    const handleCancelSelection = () => {
        setSelectedCustomer({ id: '', mobile_number: '' });
        setCustomerProducts([]); // Clear fetched products
    };
 
    return (
        <div className="customer-home1p7">
            <h2 className='cust-head'>Customers</h2>
            <div className="customer-sectionp7">
                <div className="dropdownp7" ref={customerDropdownRef}>
                    <button
                        onClick={() => {
                            setCustomerDropdownOpen(!customerDropdownOpen);
                            if (!customerDropdownOpen) {
                                customerDropdownRef.current.classList.add('dropdown-open');
                            } else {
                                customerDropdownRef.current.classList.remove('dropdown-open');
                            }
                        }}
                        className="dropdown-togglep7"
                    >
                        {selectedCustomer.mobile_number ? (
                            <>
                                {selectedCustomer.mobile_number}
                                <span className="cancel-iconp7" onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelSelection(e);
                                }}>&times;
                                </span>
                            </>
                        ) : 'Select a Customer'}
                    </button>
                    {customerDropdownOpen && (
                        <div className="dropdown-menup7">
                            <input
                                type="text"
                                placeholder="Search by mobile number"
                                value={customerSearchQuery}
                                onChange={(e) => setCustomerSearchQuery(e.target.value)}
                                className="search-inputp7"
                            />
 
                            <div className="customer-list-containerp7">
                                {loadingCustomers ? (
                                   
                                    <div className="loaderp7">Loading customers...</div> // Loader for customers
                                   
                                ) : filteredCustomers.length ? (
                                    <ul className="customer-listp7">
                                        {filteredCustomers.map((customer, index) => (
                                            <li key={index} onClick={() => handleSelectCustomer(customer)}>
                                                {customer.mobile_number}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-customersp7">No customers found</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
 
                <button onClick={handleSubmitCustomer} className="btn-submitp7" disabled={!selectedCustomer.id}>
                    Submit Customer
                </button>
           
 
            {!selectedCustomer.mobile_number && (
        <div className='no-selectedp7'>
          <p>No Customer Selected</p>
        </div>
      )}
  </div>
            {loadingProducts ? (
               
               <div style={{display: 'flex', justifyContent:'center', alignItems:'center',
            height:'50vh'
 
                }}>
                    <DotSpinner />
                </div>
               
            ) : (
                selectedCustomer.id && customerProducts.length > 0 && (
                    <div>
                        <div className='product-card-containerp7'>
                            {customerProducts.map((product, index) => (
                                <div key={index} className="cardp7">
                                    <div className="image_containerp7">
                                        <img src={product.image_url} alt={product.description} className="imagep7" />
                                    </div>
                                    <div className="bottom-sectionp7">
                                        <div className="titlep7">
                                            <p><span>{product.category}</span></p>
                                        </div> <hr className='border'/>
                                       
                                        <div className="descriptionp7">
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="volumep7">
                                            <span className="qty">Volume: <span className="volume-valuep7">{product.volume}</span></span>
                                        </div>
                                        <hr className='border'/>
                                        <p className='Final_pricep7'>Price: ₹{product.final_price}</p>
                                        {product.new_price && (
                                            <p style={{ color: 'red' }}>New Price: ₹{product.new_price}</p>
                                        )}
                                    </div>
                                    <button className="edit-buttonp7" onClick={() => {
                                        setFormData({
                                            customer_id: selectedCustomer.id,
                                            product_id: product.id,
                                            new_price: ''
                                        });
                                        setIsModalOpen(true);
                                    }}>
                                        Edit Price
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
 
            {isPopupVisible && (
                <div className="popup-notificationp7">
                    {popupMessage}
                </div>
            )}
 
            {isModalOpen && (
                <div className="modalp7">
                    <div className="modal-contentp7">
                        <h2>Edit Product Price for Customer</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Customer ID:
                                <input
                                    type="number"
                                    name="customer_id"
                                    value={formData.customer_id}
                                    readOnly
                                />
                            </label>
                            <label>
                                Product ID:
                                <input
                                    type="text"
                                    name="product_id"
                                    value={formData.product_id}
                                    readOnly
                                />
                            </label>
                            <label>
                                New Price:
                                <input
                                    type="number"
                                    name="new_price"
                                    value={formData.new_price}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default CustomersData;
 