import React, { useState } from 'react';
import AddBrand from './AddBrand';

const ParentComponent = () => {
    const [showModal, setShowModal] = useState(false);

    const handleBrandAdded = (newBrand) => {
        console.log(newBrand); // Handle the newly added brand
        setShowModal(false); // Close the modal after adding brand
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Add Brand</button>
            {showModal && (
                <AddBrand 
                    onBrandAdded={handleBrandAdded} 
                    onClose={() => setShowModal(false)} 
                />
            )}
        </div>
    );
};

export default ParentComponent;
