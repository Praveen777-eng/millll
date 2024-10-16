import React, { useEffect, useState } from 'react';
import './UpdateBrand.css'; // Import the CSS file
 
const UpdateBrand = ({ onBrandUpdate, selectedBrand }) => {
    const [updatedBrand, setUpdatedBrand] = useState({ brandID: '', brandName: '', brandLogo: null });
    const [existingLogo, setExistingLogo] = useState(''); // Store the current logo URL
    const [message, setMessage] = useState('');
 
    useEffect(() => {
        if (selectedBrand) {
            setUpdatedBrand({
                brandID: selectedBrand.brandID,
                brandName: selectedBrand.brandName,
                brandLogo: null, // Reset the logo since it's file upload
            });
            setExistingLogo(selectedBrand.brandLogo); // Set existing logo URL
        }
    }, [selectedBrand]);
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBrand({ ...updatedBrand, [name]: value });
    };
 
    const handleFileChange = (e) => {
        setUpdatedBrand({ ...updatedBrand, brandLogo: e.target.files[0] });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('brandID', updatedBrand.brandID);
        formData.append('brandName', updatedBrand.brandName);
 
        // Only append brandLogo if a new one is uploaded
        if (updatedBrand.brandLogo) {
            formData.append('brandLogo', updatedBrand.brandLogo);
        } else if (existingLogo) {
            const response = await fetch(existingLogo);
            const blob = await response.blob();
            const file = new File([blob], existingLogo.split('/').pop(), { type: 'image/jpeg' });
            formData.append('brandLogo', file);
        }
 
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
 
        try {
            const response = await fetch(`https://prasad-gz5p.onrender.com/api/brands/${updatedBrand.brandID}/update/`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Token ${token}`, // Include token with 'Token' prefix
                },
            });
 
            if (!response.ok) {
                throw new Error('Failed to update brand');
            }
 
            const updatedBrandData = await response.json();
 
            // If no new logo is uploaded, keep the existing one
            const logoURL = updatedBrand.brandLogo ? URL.createObjectURL(updatedBrand.brandLogo) : existingLogo;
            onBrandUpdate({ ...updatedBrandData, brandLogo: logoURL }); // Notify parent about the updated brand
 
            setUpdatedBrand({ brandID: '', brandName: '', brandLogo: null });
            setMessage('Brand updated successfully!');
        } catch (err) {
            setMessage(err.message);
        }
    };
 
    return (
        <div className="update-brand-containerV028">
            <h2 className="update-brand-titleV028">Update Brand</h2>
            <form onSubmit={handleSubmit} className="update-brand-formV028">
                <input
                    type="text"
                    name="brandID"
                    placeholder="Brand ID"
                    value={updatedBrand.brandID}
                    onChange={handleInputChange}
                    required
                    disabled
                    className="update-brand-inputV028"
                />
                <input
                    type="text"
                    name="brandName"
                    placeholder="Brand Name"
                    value={updatedBrand.brandName}
                    onChange={handleInputChange}
                    required
                    className="update-brand-inputV028"
                />
                <input
                    type="file"
                    name="brandLogo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="update-brand-fileV028"
                />
                {existingLogo && (
                    <div className="update-brand-logoV028">
                        <img src={existingLogo} alt="Current Brand Logo" className="update-brand-imgV028" />
                        <p className="update-brand-current-logoV028">Current logo: {existingLogo.split('/').pop()}</p>
                        <label className="update-brand-checkbox-labelV028">
                            <input
                                type="checkbox"
                                checked={!updatedBrand.brandLogo}
                                onChange={() => setUpdatedBrand({ ...updatedBrand, brandLogo: null })}
                                className="update-brand-checkboxV028"
                            />
                            Use current logo
                        </label>
                    </div>
                )}
                <button type="submit" className="update-brand-buttonV028">Update Brand</button>
            </form>
            {message && <div className="update-brand-messageV028">{message}</div>}
        </div>
    );
};
 
export default UpdateBrand;