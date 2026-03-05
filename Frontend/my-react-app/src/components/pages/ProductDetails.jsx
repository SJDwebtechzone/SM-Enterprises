import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/css/productdetailmodel.css';
import { ZoomImage } from '../../components/pages/ZoomImage';
import ProductQuantityControls from './ProductQualityControl';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});
  const [activeImage, setActiveImage] = useState('');
  const [activeView, setActiveView] = useState('image');
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (product && product._id) {
      setQuantities({ [product._id]: 1 });
      setActiveImage(product.image || '');
      setActiveView('image');
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0]);
      else setSelectedSize(product.details?.Size || '');
    }
  }, [product]);

  if (!product) return null;

  // Prepare images array (combine main image with productViews and gallery images if any)
  const allImages = [
    product.image,
    ...(product.productViews || []),
    ...(product.images || [])
  ].filter(img => img); // remove empty strings/nulls

  const getImageUrl = (img) => {
    if (!img) return '';
    return img.startsWith('http')
      ? img
      : `${import.meta.env.VITE_BACKEND_URL}${img}`;
  };

  const getVideoUrl = (vid) => {
    if (!vid) return '';
    return vid.startsWith('http')
      ? vid
      : `${import.meta.env.VITE_BACKEND_URL}${vid}`;
  };

  return (
    <Modal show={!!product} onHide={onClose} size="xl" backdrop="static" keyboard dialogClassName="modal-90w">
      <Modal.Header closeButton style={styles.header}>
        <Modal.Title style={styles.modalTitle}>{product.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styles.body}>
        <div className="container-fluid">
          <div className="row g-4">
            {/* Left Column: Image */}
            <div className="col-lg-6 text-center">
              <div style={styles.mainImageContainer}>
                {activeView === 'video' && product.video ? (
                  <video
                    key={getVideoUrl(product.video)}
                    src={getVideoUrl(product.video)}
                    controls
                    autoPlay
                    style={styles.videoPlayer}
                  />
                ) : (
                  <ZoomImage
                    src={getImageUrl(activeImage)}
                    alt={product.name}
                  />
                )}
              </div>

              <div style={styles.pricingContainer}>
                <h5 className="text-success fw-bold mt-3">
                  ₹{product.sale || product.price}.00
                  {product.sale && Number(product.sale) !== Number(product.price) && (
                    <div className="text-muted text-decoration-line-through fs-5 mt-1 ms-2">
                      ₹{product.price}.00
                    </div>
                  )}
                </h5>
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="col-lg-6 product-info">
              {/* Gallery Thumbnails - "Small boxes for different direction" */}
              <div style={styles.galleryLabel}>Product Views:</div>
              <div className="d-flex gap-2 mb-4 overflow-auto pb-2" style={styles.thumbnailContainer}>
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => { setActiveImage(img); setActiveView('image'); }}
                    style={{
                      ...styles.thumbnail,
                      borderColor: activeView === 'image' && activeImage === img ? '#d4af37' : '#eee',
                      opacity: activeView === 'image' && activeImage === img ? 1 : 0.7
                    }}
                  >
                    <img src={getImageUrl(img)} alt={`View ${index + 1}`} style={styles.thumbnailImg} />
                  </div>
                ))}

                {/* ✅ Video Thumbnail */}
                {product.video && (
                  <div
                    onClick={() => setActiveView('video')}
                    title="Watch product video"
                    style={{
                      ...styles.thumbnail,
                      borderColor: activeView === 'video' ? '#d4af37' : '#eee',
                      opacity: activeView === 'video' ? 1 : 0.7,
                      background: '#1a1a2e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: '2px',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '22px' }}>🎬</span>
                    <span style={{ fontSize: '9px', color: '#fff', fontWeight: 'bold' }}>VIDEO</span>
                  </div>
                )}
              </div>

              <h6 className="fw-bold" style={styles.sectionTitle}>Description:</h6>
              <p className="small text-muted">{product.details?.About}</p>

              <ul className="list-unstyled offers-list">
                {product.offers?.map((offer, i) => (
                  <li key={i}>✅ {offer}</li>
                ))}
              </ul>

              <div className="details mb-3">
                <p className="mb-1"><strong>Material:</strong> {product.details?.Material}</p>
                <p className="mb-1"><strong>Dimensions:</strong> {product.details?.Dimensions}</p>
                <p className="mb-1"><strong>SKU:</strong> {product.sku}</p>
                {product.details?.Size && <p className="mb-1"><strong>Size:</strong> {product.details.Size}</p>}
                {product.sizes?.length > 0 && (
                  <div className="mt-2">
                    <strong className="mb-1 d-block">Select Size:</strong>
                    <div className="d-flex gap-2">
                      {product.sizes.map(size => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "warning" : "outline-secondary"}
                          size="sm"
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
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
                      onAddToCart({ ...product, quantity: quantities[product._id], selectedSize });
                      navigate('/cart');
                    }}
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer style={styles.footer}>
        <Button variant="outline-warning" onClick={onClose} style={styles.closeBtn}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const styles = {
  header: {
    background: 'linear-gradient(to right, #fff8e1, #ffe0b2)',
    borderBottom: '1px solid #d4af37',
  },
  modalTitle: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '2rem',
    color: '#d4af37',
  },
  body: {
    background: '#fffdf9',
  },
  mainImageContainer: {
    padding: '10px',
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid #ffe0b2',
    marginBottom: '10px',
    minHeight: '400px',
  },
  pricingContainer: {
    textAlign: 'center',
    padding: '10px',
    background: '#fff8e1',
    borderRadius: '10px',
    marginTop: '10px',
  },
  galleryLabel: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#8d6e63',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  thumbnailContainer: {
    scrollbarWidth: 'thin',
    scrollbarColor: '#d4af37 #eee',
  },
  thumbnail: {
    width: '64px',
    height: '64px',
    borderRadius: '8px',
    border: '2px solid',
    padding: '2px',
    cursor: 'pointer',
    background: '#fff',
    transition: 'all 0.2s ease',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  sectionTitle: {
    color: '#5d4037',
    borderBottom: '1px solid #ffe0b2',
    paddingBottom: '5px',
    marginBottom: '10px',
  },
  footer: {
    background: '#fffdf9',
    borderTop: 'none',
  },
  closeBtn: {
    borderRadius: '20px',
    padding: '8px 25px',
    fontWeight: 'bold',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    minHeight: '350px',
    borderRadius: '10px',
    objectFit: 'contain',
    background: '#000',
  }
};

export default ProductDetail;

