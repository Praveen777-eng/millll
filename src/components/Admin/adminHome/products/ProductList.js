import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import UpdateProductForm from './UpdateProductForm';
import './ProductList.css';
import Spinner from '../../spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
    const { brandID } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [notification, setNotification] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://prasad-gz5p.onrender.com/api/products/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const filteredProducts = data.filter(product => product.brandID === brandID);
            setProducts(filteredProducts);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [brandID]);

    const handleProductAddedOrUpdated = () => {
        fetchProducts();
        setShowAddProductModal(false);
        setShowUpdateProductModal(false);
        setNotification('Product updated successfully!');
        setTimeout(() => setNotification(''), 3000);
    };

    const toggleAddProductModal = () => {
        setShowAddProductModal(!showAddProductModal);
        setShowUpdateProductModal(false);
    };

    const handleUpdateProduct = (product) => {
        setCurrentProduct(product);
        setShowUpdateProductModal(true);
        setShowAddProductModal(false);
    };

    const handleBackToBrands = () => {
        // Set the brandID to null and navigate to brands
        

        navigate('/brands');
    };

    if (loading) {
        return <div className="product-list-loadingV025"><Spinner /></div>;
    }

    if (error) {
        return <div className="product-list-errorV025">Error: {error}</div>;
    }

    return (
        <div className="product-list-containerV025">
            {notification && (
                <div className="notification-container" onClick={() => setNotification('')}>
                    {notification}
                </div>
            )}
            <h1 className="product-list-titleV025" style={{ textAlign: 'center' }}>
                Product List for Brand {brandID}
            </h1>
            <button className="back-button143" onClick={handleBackToBrands}>
                <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </button>
            <button className="product-list-add-buttonV025" onClick={toggleAddProductModal}>
                {showAddProductModal ? 'Close' : 'Add Product'}
            </button>
            {showAddProductModal && (
                <dialog className="product-list-modalV025" open>
                    <div className="product-list-modal-contentV025">
                        <span className="product-list-closeV025" onClick={toggleAddProductModal}>&times;</span>
                        <AddProductForm onProductAdded={handleProductAddedOrUpdated} />
                    </div>
                </dialog>
            )}
            {showUpdateProductModal && (
                <dialog className="product-list-modalV025" open>
                    <div className="product-list-modal-contentV025">
                        <span className="product-list-closeV025" onClick={() => setShowUpdateProductModal(false)}>&times;</span>
                        <UpdateProductForm
                            onProductUpdated={handleProductAddedOrUpdated}
                            currentProduct={currentProduct}
                        />
                    </div>
                </dialog>
            )}
            <div className="product-card-container">
                {products.map((product) => (
                    <div className="card" key={product.productid}>
                        <div className="image_container">
                            <img src={product.productImage} alt={product.productCategory} className="image" />
                        </div>
                        <h2 className="title">{product.productCategory}</h2>
                        <p className="description">{product.productDescription}</p>
                        <p className="Final_price">Price: ₹{new Intl.NumberFormat('en-IN').format(product.productPrice)}</p>
                        <button className="edit-button" onClick={() => handleUpdateProduct(product)}>
                            Update
                        </button>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .notification-container {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    background-color: #28a745;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    transition: opacity 0.5s ease;
                }
            `}</style>
        </div>
    );
};

export default ProductList;
