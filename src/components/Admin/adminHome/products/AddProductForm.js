import React, { useState } from 'react';
import "./AddProductForm.css"
 
const AddProductForm = ({ onProductAdded }) => {
    const [newProduct, setNewProduct] = useState({
        productid: '',
        productCategory: '',
        productType: '',
        productImage: null,
        productVolume: '',
        productPrice: '',
        productDescription: '',
        brandID: ''
    });
    const [message, setMessage] = useState('');
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };
 
    const handleFileChange = (e) => {
        setNewProduct({ ...newProduct, productImage: e.target.files[0] });
    };
 
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('productid', newProduct.productid);
    //     formData.append('productCategory', newProduct.productCategory);
    //     formData.append('productType', newProduct.productType);
    //     formData.append('productImage', newProduct.productImage);
    //     formData.append('productVolume', newProduct.productVolume);
    //     formData.append('productPrice', newProduct.productPrice);
    //     formData.append('productDescription', newProduct.productDescription);
    //     formData.append('brandID', newProduct.brandID);
 
    //     try {
    //         const response = await fetch('https://prasad-gz5p.onrender.com/api/products/', {
    //             method: 'POST',
    //             body: formData,
    //         });
 
    //         if (!response.ok) {
    //             throw new Error('Failed to add product');
    //         }
 
    //         const addedProduct = await response.json();
    //         onProductAdded(addedProduct); // Notify the parent component
    //         setNewProduct({
    //             productid: '',
    //             productCategory: '',
    //             productType: '',
    //             productImage: null,
    //             productVolume: '',
    //             productPrice: '',
    //             productDescription: '',
    //             brandID: ''
    //         });
    //         setMessage('Product added successfully!');
    //     } catch (err) {
    //         setMessage(err.message);
    //     }
    // };
 

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
            setMessage('You are not authenticated. Please log in.');
            return;
        }
     
        const formData = new FormData();
        formData.append('productid', newProduct.productid);
        formData.append('productCategory', newProduct.productCategory);
        formData.append('productType', newProduct.productType);
        if (newProduct.productImage) {
            formData.append('productImage', newProduct.productImage);
        }
        formData.append('productVolume', newProduct.productVolume);
        formData.append('productPrice', newProduct.productPrice);
        formData.append('productDescription', newProduct.productDescription);
        formData.append('brandID', newProduct.brandID);
     
        try {
            const response = await fetch('https://prasad-gz5p.onrender.com/api/products/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,  // Attach token here
                },
                body: formData,
            });
     
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
     
            const addedProduct = await response.json();
            onProductAdded(addedProduct); // Notify the parent component
     
            setNewProduct({
                productid: '',
                productCategory: '',
                productType: '',
                productImage: null,
                productVolume: '',
                productPrice: '',
                productDescription: '',
                brandID: ''
            });
     
            setMessage('Product added successfully!');
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div>
            <h2 style={{color:'whitesmoke'}}>Add a New Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="productid"
                    placeholder="Product ID"
                    value={newProduct.productid}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="productCategory"
                    placeholder="Product Category"
                    value={newProduct.productCategory}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="productType"
                    placeholder="Product Type"
                    value={newProduct.productType}
                    onChange={handleInputChange}
                />
                <input
                    type="file"
                    name="productImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="text"
                    name="productVolume"
                    placeholder="Product Volume"
                    value={newProduct.productVolume}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="productPrice"
                    placeholder="Product Price"
                    value={newProduct.productPrice}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="productDescription"
                    placeholder="Product Description"
                    value={newProduct.productDescription}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="brandID"
                    placeholder="Brand ID"
                    value={newProduct.brandID}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
 
export default AddProductForm;