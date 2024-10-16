import React, { useState, useEffect } from 'react';
import "./UpdateProductForm.css";

const UpdateProductForm = ({ onProductUpdated, currentProduct }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        productid: '',
        productCategory: '',
        productType: '',
        productImage: '',
        productVolume: '',
        productPrice: '',
        productDescription: '',
        brandID: ''
    });
    const [existingImage, setExistingImage] = useState(''); // Store the current image URL
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (currentProduct) {
            setUpdatedProduct(currentProduct);
            setExistingImage(currentProduct.productImage); // Set existing image
        }
    }, [currentProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, productImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken'); // Retrieve token
   
        const formData = new FormData();
        formData.append('productid', updatedProduct.productid);
        formData.append('productCategory', updatedProduct.productCategory);
        formData.append('productType', updatedProduct.productType);
        formData.append('productVolume', updatedProduct.productVolume);
        formData.append('productPrice', updatedProduct.productPrice);
        formData.append('productDescription', updatedProduct.productDescription);
        formData.append('brandID', updatedProduct.brandID);
   
        // If a new image is uploaded, append it; otherwise, keep the existing image
        if (updatedProduct.productImage) {
            formData.append('productImage', updatedProduct.productImage);
        } else if (existingImage) {
            const response = await fetch(existingImage);
            const blob = await response.blob();
            const file = new File([blob], existingImage.split('/').pop(), { type: 'image/jpeg' }); // Adjust file type if necessary
            formData.append('productImage', file);
        }
   
        try {
            const response = await fetch(`https://prasad-gz5p.onrender.com/api/products/${updatedProduct.productid}/update/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`, // Add the authorization header
                },
                body: formData,
            });
   
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
   
            const updatedProductData = await response.json();
            onProductUpdated(updatedProductData); // Notify the parent component
            setMessage('Product updated successfully!');
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="update-product-formV009">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit} className="update-product-form-elementV009">
    <div className="input-group">
        <input
            type="text"
            name="productCategory"
            placeholder="Product Category"
            value={updatedProduct.productCategory}
            onChange={handleInputChange}
            required
            className="update-product-inputV009"
        />
        <input
            type="text"
            name="productType"
            placeholder="Product Type"
            value={updatedProduct.productType}
            onChange={handleInputChange}
            className="update-product-inputV009"
        />
    </div>
    <div className="input-group">
        <input
            type="file"
            name="productImage"
            accept="image/*"
            onChange={handleFileChange}
            className="update-product-file-inputV009"
        />
        {existingImage && (
            <div className="current-image-displayV009">
                <img src={existingImage} alt="Current Product" />
                <div className="current-image-checkboxV009">
                    <input
                        type="checkbox"
                        checked={!updatedProduct.productImage} // Keep existing image if no new file is selected
                        onChange={() => setUpdatedProduct({ ...updatedProduct, productImage: null })} // Clear new image selection
                    />
                    <span>Use Current Image</span>
                </div>
            </div>
        )}
    </div>
    <div className="input-group">
        <input
            type="text"
            name="productVolume"
            placeholder="Product Volume"
            value={updatedProduct.productVolume}
            onChange={handleInputChange}
            required
            className="update-product-inputV009"
        />
        <input
            type="number"
            name="productPrice"
            placeholder="Product Price"
            value={updatedProduct.productPrice}
            onChange={handleInputChange}
            required
            className="update-product-inputV009"
        />
    </div>
    <textarea
        name="productDescription"
        placeholder="Product Description"
        value={updatedProduct.productDescription}
        onChange={handleInputChange}
        required
        className="update-product-textareaV009"
    />
    <input
        type="text"
        name="brandID"
        placeholder="Brand ID"
        value={updatedProduct.brandID}
        onChange={handleInputChange}
        
        required
        className="update-product-inputV009"
    />
    <button type="submit" className="update-product-buttonV009">Update Product</button>
</form>

            {message && <div className="update-product-messageV009">{message}</div>}
        </div>
    );
};

export default UpdateProductForm;
