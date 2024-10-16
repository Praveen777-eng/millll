import React, { useEffect, useState } from 'react';
import DotSpinner from '../BasicDotSpinner/DotSpinner';
import './BasicProductList.css';
 
const BasicBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedBrandID, setSelectedBrandID] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [viewingProducts, setViewingProducts] = useState(false); // New state to track view
 
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
            setViewingProducts(true); // Set viewing products to true
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
        setViewingProducts(false); // Reset viewing products state
        setProducts([]); // Clear products
    };
 
    if (loading) {
        return <div className="loading-messageb23"><DotSpinner/></div>;
    }
 
    if (error) {
        return <div className="error-messageb23">Error: {error}</div>;
    }
 
    const filteredBrands = brands.filter((brand) =>
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    return (
        <div className="brand-list-containerb23">
 
 
            {!viewingProducts ? ( // Show brand list if not viewing products
                <>
                    <h1 className="brand-list-titleb23">Brand List</h1>
                    <input
                        type="text"
                        placeholder="Search brands..."
                        className="search-barb23"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="card-containerb23">
                        {filteredBrands.map((brand) => (
                            <div className="brand-cardb23" key={brand.brandID}>
                                <div className="logo-containerb23">
                                    <img
                                        src={brand.brandLogo}
                                        alt={brand.brandName}
                                        className="brand-logob23"
                                    />
                                </div>
                                <h2 className="brand-nameb23">{brand.brandName}</h2>
                                <button
                                    className="update-buttonb23"
                                    onClick={() => handleViewProducts(brand.brandID)}>
                                    View Products
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className='product-list-card-containerb23'>
                    <div className='back-button-containerb23'>
                    <button onClick={handleBackToBrands} className="back-button-btnb23">Back to Brands</button>
                    <h2 className='heading-products-b23'>Products for {selectedBrandID}</h2>
                    </div>
                    <div className="product-list-card-containerb23">
                        {products.map((product) => (
                            <div className="product-list-cardb23" key={product.productID}>
                                <img src={product.productImage} alt={product.productCategory} className="product-list-imageb23" />
                                <h2 className="product-list-titleb23">{product.productCategory}</h2>
                                <p className="product-list-descriptionb23">{product.productDescription}</p>
                                <p className="product-list-volumeb23">Volume: {product.productVolume}</p>
                                <p className="product-list-priceb23">Price: ${product.productPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default BasicBrands;
 
 