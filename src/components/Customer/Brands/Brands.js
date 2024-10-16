import React, { useEffect, useState } from 'react';
import DotSpinner from '../DotSpinner/DotSpinner';
import './Brands.css';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedBrandID, setSelectedBrandID] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [viewingProducts, setViewingProducts] = useState(false); // State to track viewing products

    // Fetch brands when component mounts
    useEffect(() => {
        const fetchBrands = async () => {
            const token = localStorage.getItem('authToken');
            setLoading(true);
            try {
                const response = await fetch('https://prasad-gz5p.onrender.com/api/brands/', {
                    headers: { 'Authorization': `Token ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch brands data');
                }

                const data = await response.json();
                setBrands(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    // Fetch products based on selected brand ID
    const fetchProducts = async (brandID) => {
        setLoadingProducts(true);
        try {
            const response = await fetch('https://prasad-gz5p.onrender.com/api/products/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const filteredProducts = data.filter(product => product.brandID === brandID);
            setProducts(filteredProducts);
            setSelectedBrandID(brandID);
            setViewingProducts(true); // Set to true when viewing products
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingProducts(false);
        }
    };

    // Handle viewing products of a selected brand
    const handleViewProducts = (brandID) => {
        fetchProducts(brandID);
    };

    // Handle going back to brands
    const handleBackToBrands = () => {
        setViewingProducts(false);
        setProducts([]); // Clear products when going back
        setSelectedBrandID(null); // Clear selected brand ID
    };

    if (loading) {
        return <div className="loading-message"><DotSpinner/></div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    // Filter brands based on the search term
    const filteredBrands = brands.filter((brand) =>
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="brand-list-container">
            {viewingProducts ? ( // Render products view if viewingProducts is true
                <div>
                    <div className='back-button-cont1000'>
                    <button className="back-button1000" onClick={handleBackToBrands}>
                        Back 
                    </button>
                    <h2 className='product-head-1000'>Products for Brand ID: {selectedBrandID}</h2>
                    </div>
                    <div className="product-list-card-container1000">
                        {products.map((product) => (
                            <div className="product-list-card1000" key={product.productID}>
                                {/* <img src={product.productImage} alt={product.productCategory} className="product-list-image1000" /> */}
                                <h2 className="product-list-title1000">{product.productCategory}</h2>
                                <p className="product-list-description1000">{product.productDescription}</p>
                                <p className="product-list-volume1000">Volume: {product.productVolume}</p>
                                <p className="product-list-price1000">Price: {product.productPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="brand-list-title">Brand List</h1>
                    <input
                        type="text"
                        placeholder="Search brands..."
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="card-container">
                        {filteredBrands.map((brand) => (
                            <div className="brand-card" key={brand.brandID}>
                                
                                <div className="logo-container">
                                    {/* <img
                                        src={brand.brandLogo}
                                        alt={brand.brandName}
                                        className="brand-logo"
                                    /> */}
                                </div>
                                <h2 className="brand-name">{brand.brandName}</h2>
                                <button
                                    className="update-button"
                                    onClick={() => handleViewProducts(brand.brandID)}>
                                    View Products
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Brands;
