import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/css/productdetailmodel.css';
import { ZoomImage } from '../../components/pages/ZoomImage';
import ProductQuantityControls from './ProductQualityControl';
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({ product, onClose, onAddToCart }) => {
const [quantities, setQuantities] = useState({});
const navigate = useNavigate();



  // useEffect(() => {
  //   const modal = new window.bootstrap.Modal(document.getElementById('productModal'));
  //   modal.show();
  //   return () => modal.hide();
  // }, []);
  useEffect(() => {
  const modalElement = document.getElementById('productModal');
  const modalInstance = new window.bootstrap.Modal(modalElement);
  modalInstance.show();

  // return () => {
  //   modalInstance.hide();
  //   modalInstance.dispose(); // fully clean up modal instance
  //   document.body.classList.remove('modal-open'); // remove lingering scroll lock
  //   const backdrop = document.querySelector('.modal-backdrop');
  //   if (backdrop) backdrop.remove(); // remove leftover backdrop
  // };
  return () => {
  modalInstance.hide();
  modalInstance.dispose();
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.removeAttribute('data-bs-overflow');
  document.body.removeAttribute('data-bs-padding-right');
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) backdrop.remove();
};
}, []);

useEffect(() => {
  if (product && product._id) {
    setQuantities({ [product._id]: 1 });
  }
}, [product]);

// useEffect(() => {
//   const initialQuantities = product.reduce((acc, product) => {
//     acc[product._id] = 1;
//     return acc;
//   }, {});
//   setQuantities(initialQuantities);
// }, [products]);


  if (!product) return null;

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

//   const handleBuyNow = () => {
//   const selectedQuantity = quantities[product._id] || 1;

//   navigate('/checkout', {
//     state: {
//       cartItems: [{ ...product, quantity: selectedQuantity }],
//       subtotal: product.price * selectedQuantity,
//       discount: 0,
//       delivery: 50, // or calculate dynamically
//       total: product.price * selectedQuantity + 50
//     }
//   });
// };

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content product-modal">
          {/* Modal Header */}
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <div className="row g-4">
              {/* Left Column: Image */}
              <div className="col-md-5 text-center">
                <div className="zoom-container">
                  <ZoomImage 
                  // src={product.image} 
                  src={product.image?.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}${product.image}`}
                  alt={product.name} />
                {/* <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid rounded shadow-sm product-image zoom-image"
                /> */}
                </div>
                <h6 className="mt-3">{product.name}</h6>
                <h5 className="text-success fw-bold mt-2">
                  ₹{product.price}.00
                  <span className="text-muted text-decoration-line-through ms-2 fs-6">
                    ₹{product.originalPrice}.00
                  </span>
                </h5>
              </div>

              {/* Right Column: Info */}
              <div className="col-md-7 product-info">
                <h6 className="fw-bold">Description:</h6>
                <p className="small text-muted">{product.details?.About}</p>

                <ul className="list-unstyled offers-list">
                  {product.offers?.map((offer, i) => (
                    <li key={i}>✅ {offer}</li>
                  ))}
                </ul>

                <div className="details mb-3">
                  <p><strong>Material:</strong> {product.details?.Material}</p>
                  <p><strong>Dimensions:</strong> {product.details?.Dimensions}</p>
                  <p><strong>SKU:</strong> {product.sku}</p>
                </div>

                {/* Quantity & Actions */}
                <div className="purchase-actions">
                  {/* <div className="quantity-selector d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="form-control mx-2 text-center"
                      value={quantity}
                      min="1"
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      +
                    </button>
                  </div> */}
                   <ProductQuantityControls
                      productId={product._id}
                      quantities={quantities}
                      setQuantities={setQuantities}
                    />

                  <div className="mt-3 d-flex gap-3">
                    <button className="btn btn-warning w-100 fw-bold"  
                    onClick={() => {onAddToCart({ ...product, quantity: quantities[product._id] })
                     navigate('/cart')
                  
                    }}
                   
                    >
                      ADD TO CART
                    </button>
                    {/* <button className="btn btn-success w-50 fw-bold" onClick={handleBuyNow}>
                      BUY IT NOW
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div> {/* End Modal Body */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
