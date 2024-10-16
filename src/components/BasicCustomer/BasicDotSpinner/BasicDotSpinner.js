import React from 'react';
import './BasicDotSpinner.css'; // Make sure to import the CSS file
 
const BasicDotSpinner = () => {
  return (
    // <div className="dot-spinner-container">
      <div className="dot-spinnerb26">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className={`dot-spinner__dotb26 dot-spinner__dotb26--${index + 1}`}></div>
        ))}
      </div>
    // </div>
  );
};
 
export default BasicDotSpinner;