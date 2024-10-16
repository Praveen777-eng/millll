import React from 'react';
import './DotSpinner.css'; // Make sure to import the CSS file
 
const DotSpinner = () => {
  return (
    // <div className="dot-spinner-container">
      <div className="dot-spinner">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className={`dot-spinner__dot dot-spinner__dot--${index + 1}`}></div>
        ))}
      </div>
    // </div>
  );
};
 
export default DotSpinner;
 
 