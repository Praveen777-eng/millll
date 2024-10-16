import React, { useState } from 'react';
import "./AddBrand.css";

const AddBrand = ({ onBrandAdded }) => {
    const [newBrand, setNewBrand] = useState({ brandID: '', brandName: '', brandLogo: null });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBrand({ ...newBrand, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewBrand({ ...newBrand, brandLogo: e.target.files[0] });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    const token = localStorage.getItem('authToken');
        if (!token) {
            setMessage('You are not authenticated. Please log in.');
            return;
        }
        const formData = new FormData();
        formData.append('brandID', newBrand.brandID);
        formData.append('brandName', newBrand.brandName);
        if (newBrand.brandLogo) {
            formData.append('brandLogo', newBrand.brandLogo);
        }
 
        try {
            const response = await fetch(`https://prasad-gz5p.onrender.com/api/brands/`, {
                method: 'POST',
    headers: {
        'Authorization': `Token ${token}`,
    },
                body: formData,
            });
 
            if (!response.ok) {
                throw new Error('Failed to add brand');
            }
 
            const addedBrand = await response.json();
            onBrandAdded(addedBrand); // Notify parent about the newly added brand
 
            setNewBrand({ brandID: '', brandName: '', brandLogo: null });
            
        } catch (err) {
            setMessage(err.message);
        }
    };    return (
        <div className="add-brand-containerV029">
            <h2 className="add-brand-titleV029">Add a New Brand</h2>
            <form onSubmit={handleSubmit} className="add-brand-formV029">
                <input
                    type="text"
                    name="brandID"
                    placeholder="Brand ID"
                    value={newBrand.brandID}
                    onChange={handleInputChange}
                    required
                    className="add-brand-inputV029"
                />
                <input
                    type="text"
                    name="brandName"
                    placeholder="Brand Name"
                    value={newBrand.brandName}
                    onChange={handleInputChange}
                    required
                    className="add-brand-inputV029"
                />
                <input
                    type="file"
                    name="brandLogo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="add-brand-fileV029"
                />
                <button type="submit" className="add-brand-buttonV029">Add Brand</button>
            </form>
            {message && <div className="add-brand-messageV029">{message}</div>}
        </div>
    );
};

export default AddBrand;
