import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/css/productdetailmodel.css';
import { ZoomImage } from '../../components/pages/ZoomImage';
import ProductQuantityControls from './ProductQualityControl';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (product && product._id) {
      setQuantities({ [product._id]: 1 });
    }
  }, [product]);

  if (!product) return null;

  return (
    <Modal show={!!product} onHide={onClose} centered size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="row g-4">
          {/* Left Column: Image */}
          <div className="col-md-5 text-center">
            <div className="zoom-container">
              <ZoomImage
                src={
                  product.image
                    ? product.image.startsWith('http')
                      ? product.image
                      : `${import.meta.env.VITE_BACKEND_URL}${product.image}`
                    : ''
                }
                alt={product.name}
              />
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
              <ProductQuantityControls
                productId={product._id}
                quantities={quantities}
                setQuantities={setQuantities}
              />

              <div className="mt-3 d-flex gap-3">
                <Button
                  variant="warning"
                  className="w-100 fw-bold"
                  onClick={() => {
                    onAddToCart({ ...product, quantity: quantities[product._id] });
                    navigate('/cart');
                  }}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetail;

