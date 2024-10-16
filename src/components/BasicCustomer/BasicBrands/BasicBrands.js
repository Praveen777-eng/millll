import React, { useEffect, useState } from 'react';
import DotSpinner from '../BasicDotSpinner/BasicDotSpinner';
import './BasicBrands.css';

const BasicBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedBrandID, setSelectedBrandID] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [viewingProducts, setViewingProducts] = useState(false);

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
            console.log(filteredProducts)
            setProducts(filteredProducts);
            setSelectedBrandID(brandID);
            setViewingProducts(true); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleViewProducts = (brandID) => {
        fetchProducts(brandID);
    };

    const handleBackToBrands = () => {
        setViewingProducts(false);
        setProducts([]);
        setSelectedBrandID(null);
    };

    if (loading) {
        return <div className="loading-messageb30"><DotSpinner /></div>;
    }

    if (error) {
        return <div className="error-messageb30">Error: {error}</div>;
    }

    const filteredBrands = brands.filter((brand) =>
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    

    return (
        <div className="brand-list-containerb30">
            {viewingProducts ? (
            <div>
                <div className="selectasupplierb30">
                    <h3>Please select a Supplier to Buy Products</h3>
                </div>
                    <div className="back-button-contb30">
                        <button className="back-buttonb30" onClick={handleBackToBrands}>
                            Back
                        </button>
                        <h2 className="product-headb30">Products for Brand ID: {selectedBrandID}</h2>
                    </div>
                    <div className="product-list-card-containerb30">
                        {products.map((product) => (
                            <div className="product-list-cardb30" key={product.productid}>
                            
                                <img src={product.productImage} alt={product.productCategory} className="product-list-imageb30" />
                                <h2 className="product-list-titleb30">{product.productCategory}</h2>
                                <p className="product-list-descriptionb30">{product.productDescription}</p>
                                <p className="product-list-volumeb30">Volume: {product.productVolume}</p>
                                <p className="product-list-priceb30">Price: ₹{product.productPrice}</p>
                                
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="brand-list-titleb30">Brand List</h1>
                    <input
                        type="text"
                        placeholder="Search brands..."
                        className="search-barb30"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="card-containerb30">
                        {filteredBrands.map((brand) => (
                            <div className="brand-cardb30" key={brand.brandID}>
                                <div className="logo-containerb30">
                                    <img
                                        src={brand.brandLogo}
                                        alt={brand.brandName}
                                        className="brand-logob30"
                                    />
                                </div>
                                <h2 className="brand-nameb30">{brand.brandName}</h2>
                                <button
                                    className="update-buttonb30"
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

export default BasicBrands;