import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BrandList.css';
import UpdateBrand from './UpdateBrand';
import AddBrand from './AddBrand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../spinner/Spinner';
 
const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [showAddBrandForm, setShowAddBrandForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const updateModalRef = useRef(null);
 
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch('https://prasad-gz5p.onrender.com/api/brands/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBrands(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
 
        fetchBrands();
    }, []);
 
    const handleBrandUpdate = (updatedBrand) => {
        setBrands((prevBrands) =>
            prevBrands.map((brand) =>
                brand.brandID === updatedBrand.brandID
                ? { ...brand, brandName: updatedBrand.brandName, brandLogo: updatedBrand.brandLogo }
                : brand
            )
        );
        setSelectedBrand(null);
        updateModalRef.current.close();
    };
 
    const handleBrandAdd = (newBrand) => {
        setBrands([...brands, newBrand]);
        setShowAddBrandForm(false);
    };
 
    const handleUpdateClick = (brand) => {
        setSelectedBrand(brand);
        updateModalRef.current.showModal();
    };
 
    // Filter brands based on the search term
    const filteredBrands = brands.filter((brand) =>
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    if (loading) {
        return <div>
            <Spinner/>
        </div>;
    }
 
    if (error) {
        return <div>Error: {error}</div>;
    }
 
    return (
        <div className="brand-listV030">
            
            {/* Add Brand Button */}
                <div className='arrow-back-124'>
            <button
                className="add-brand-buttonV030"
                onClick={() => setShowAddBrandForm(!showAddBrandForm)}
            >
                {showAddBrandForm ? 'Cancel' : 'Add Brand'}
            </button>
            {/* <Link to="/admin-home" className="back-button124">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </Link> */}
            </div>
            {/* Search Bar */}
            <div className="search-bar-containerV030">
                <input
                    type="text"
                    placeholder="Search by Brand Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-barV030"
                />
            </div>
 
            {/* AddBrand form, show when "Add Brand" is clicked */}
            {showAddBrandForm && <AddBrand onBrandAdded={handleBrandAdd} />}
 
            <div className="card-containerV030">
                {filteredBrands.map((brand) => (
                    <div className="brand-cardV030" key={brand.brandID}>
                        <img
                            src={brand.brandLogo}
                            alt={brand.brandName}
                            className="brand-logoV030"
                        />
                        <h2 className="brand-nameV030">{brand.brandName}</h2>
                        <div className="button-containerV030">
                            <Link to={`/products/${brand.brandID}`} className="view-buttonV030">
                                Products
                            </Link>
                            <button
                                className="update-buttonV030"
                                onClick={() => handleUpdateClick(brand)}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>
 
            {/* Modal for UpdateBrand */}
            <dialog ref={updateModalRef} className="update-brand-modalV030">
                {selectedBrand && (
                    <UpdateBrand
                        selectedBrand={selectedBrand}
                        onBrandUpdate={handleBrandUpdate}
                    />
                )}
                <button
                    className="close-modal-buttonV030"
                    onClick={() => updateModalRef.current.close()}
                >
                    Close
                </button>
            </dialog>
        </div>
    );
};
 
export default BrandList;