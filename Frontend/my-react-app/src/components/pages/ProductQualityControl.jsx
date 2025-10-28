import React, { useState } from 'react';

function ProductQuantityControls({ productId, quantities, setQuantities }) {
  const [showControls, setShowControls] = useState(false);

  const incrementQuantity = () => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decrementQuantity = () => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      {!showControls ? (
        <button
        className="btn btn-sm text-white "
        style={{ backgroundColor: '#198754',textAlign:'center' }} 
          
          onClick={() => setShowControls(true)}
        >
          Add</button>
      ) : (
        <>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={decrementQuantity}
          >
            <i className="bi bi-dash"></i>
          </button>
          <span className="fw-bold">{quantities[productId] || 1}</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={incrementQuantity}
          >
            <i className="bi bi-plus"></i>
          </button>
        </>
      )}
    </div>
  );
}

export default ProductQuantityControls;