


import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import './OrderHistory.css';
import Spinner from '../../spinner/Spinner';

const CustomerOrders = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true); // Set loading to true
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch('https://prasad-gz5p.onrender.com/api/manage-negotiated-prices/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }

        const data = await response.json();
        setCustomers(data.customers || []);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    const fetchProducts = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch('https://prasad-gz5p.onrender.com/api/products/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!selectedCustomer) return; // Don't fetch if no customer is selected

      setLoading(true); // Set loading to true
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch('https://prasad-gz5p.onrender.com/api/view-customer-orders/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        const customerOrders = data.orders.invoices.filter(
          (order) => order.customer_mobile_number === selectedCustomer
        );
        setOrders(customerOrders);
        setFilteredOrders(customerOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchOrders();
  }, [selectedCustomer]);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toString().includes(searchTerm) ||
          order.price.toString().includes(searchTerm)
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (order) => order.date === selectedDate
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, selectedDate, orders]);

  const handleRowClick = async (orderId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://prasad-gz5p.onrender.com/api/view-invoice/${orderId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoice details');
      }

      const invoiceData = await response.json();
      setInvoiceDetails(invoiceData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching invoice details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInvoiceDetails(null);
  };

  const getProductDetails = (productId) => {
    const product= products.find(product => product.productid === productId);
    console.log(product);
    return(product);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
   
    // Define margins
    const leftMargin = 10;
    const topMargin = 10;
    const lineHeight = 10; // Space between lines
   
    // Set font size
    doc.setFontSize(16);
   
    // Add Invoice ID
    doc.text(`Invoice ID: ${invoiceDetails.invoice_id}`, leftMargin, topMargin);
    doc.text('Items:', leftMargin, topMargin + lineHeight);
   
    let yPosition = topMargin + lineHeight * 2; // Start position for items
   
    invoiceDetails.items.forEach((item, index) => {
      const product = products.find(prod => prod.productid === item.product_id);
      const itemDetails = `
        Product ID: ${item.product_id}
        Quantity: ${item.quantity}
        Total Price: ${item.total_price}
        ${product ? `Category: ${product.productCategory}` : ''}
        ${product ? `Volume: ${product.productVolume}` : ''}
      `;
     
      // Split itemDetails into lines to avoid exceeding PDF width
      const lines = doc.splitTextToSize(itemDetails, 190 - leftMargin * 2); // Adjust width for margins
      doc.text(lines, leftMargin, yPosition);
      yPosition += lines.length * lineHeight; // Adjust the position for the next item
    });
   
    // Save the PDF with a filename
    doc.save(`invoice_${invoiceDetails.invoice_id}.pdf`);
  };

  return (
    <div className="customer-orders-container-V040">
      {loading ? (
        <div className="loader">

            <Spinner/>
        </div> // Loader
      ) : (
        <>
          <h2 className="customer-orders-title-V040">Select Customer</h2>
          <select
            className="customer-select-V040"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.mobile_number}>
                {customer.mobile_number}
              </option>
            ))}
          </select>

          <div className="filter-container-V040">
            <input
              type="text"
              className="search-input-V040"
              placeholder="Search by Order ID or Price"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="date"
              className="date-picker-V040"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {filteredOrders.length > 0 ? (
            <div className="orders-section-V040">
              <h3 className="orders-title-V040">Orders for {selectedCustomer}</h3>
              <table className="orders-table-V040">
                <thead>
                  <tr className="table-header-V040">
                    <th className="table-header-item-V040">Order ID</th>
                    <th className="table-header-item-V040">Customer Name</th>
                    <th className="table-header-item-V040">Price</th>
                    <th className="table-header-item-V040">Date</th>
                    <th className="table-header-item-V040">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr className="table-row-V040" key={order.id} onClick={() => handleRowClick(order.id)}>
                      <td className="table-data-V040">{order.id}</td>
                      <td className="table-data-V040">{order.customer_name}</td>
                      <td className="table-data-V040">{order.price}</td>
                      <td className="table-data-V040">{order.date}</td>
                      <td className="table-data-V040">{order.supplier_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            selectedCustomer && (
              <div className="no-orders-message-V040">
                <p>No orders found for the selected customer.</p>
              </div>
            )
          )}

          {isModalOpen && invoiceDetails && (
            <div className="modal-VA40">
              <div className="modal-content-VA40">
                <h3>Invoice ID: {invoiceDetails.invoice_id}</h3>
                <h4>Items:</h4>
                <ul>
                  {invoiceDetails.items.map((item, index) => {
                    const product = getProductDetails(item.product_id);
                    return (
                      <li key={index} className="invoice-item-VA40">
                        <div className="invoice-item-wrapper-VA40">
                          <div className="invoice-product-image-VA40">
                            {/* {product && product.image && <img src={product.image} alt={product.product_name} />} */}
                            {product && product.productImage && (
                    <img src={product.productImage} alt={product.productCategory} />
                  )}
                          </div>
                          <div className="invoice-item-details-VA40">
                            <strong>Product ID: {item.product_id} </strong>  <br />
                            <strong>Quantity: {item.quantity}</strong>  <br />
                            <strong>Total Price: {item.total_price}</strong>  <br />
                            {product && (
                              <>
                                <strong>Category: {product.productCategory} </strong>  <br />
                                <strong>Volume: {product.productVolume}</strong> 
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <button className="modal-close-button-VA40" onClick={closeModal}>Close</button>
                <button className="download-button-VA40" onClick={downloadPDF}>Download PDF</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerOrders;
