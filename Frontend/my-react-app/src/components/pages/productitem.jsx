import React, { useEffect, useState } from "react";
import ProductDetail from "./productdetail";
import ProductQuantityControls from "./ProductQualityControl";
import axios from "axios";
import '../../assets/css/css/ProductItem.css'

const ProductCard = ({ products, onAddToCart, onAddToWishlist, wishlist = [] }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
   const [reviews, setReviews] = useState([]);
   console.log('products',products)
 
  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/reviews')
  //     .then(res => setReviews(res.data))
  //     .catch(err => console.error(err));
  // }, []);

useEffect(() => {
  const initialQuantities = products.reduce((acc, product) => {
    acc[product._id] = 1;
    return acc;
  }, {});
  setQuantities(initialQuantities);
}, [products]);

const incrementQuantity = (id) => {
  setQuantities((prev) => ({
    ...prev,
    [id]: prev[id] + 1,
  }));
};

const decrementQuantity = (id) => {
  setQuantities((prev) => ({
    ...prev,
    [id]: Math.max(1, prev[id] - 1),
  }));
};
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`bi ${i < rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}></i>
    ));
  };



  return (
    <>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-4">
            <div className="card product-card h-100 shadow-sm border-1" 
            // style={{backgroundColor:'#d6c721ff'}}
            >
              <div className="position-relative" >
                <img 
                // src={product.image} 
                 src={product.image?.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}${product.image}`}

                alt={product.name} className="card-img-top product-image shadow-lg border-5" />
                {product.discount && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    {product.discount}
                  </span>
                )}
              </div>
              <div className="card-body product-body text-center">
                <h5 className="card-title product-title" style={{ color: '#30272bff' }}>{product.name}</h5>
                <div className="pricing">
                  {product.sale ? (
                    <p className="mb-2">
                      <span className="text-muted text-decoration-line-through me-2">₹{product.price}</span>
                      <span className="text-success fw-bold">₹{product.sale}</span>
                    </p>
                  ) : (
                    <p className="mb-2 fw-bold">₹{product.price}</p>
                  )}
                </div>
                <div className="d-flex flex-column align-items-center gap-2 mb-2">
 <div>{renderStars(product.averageRating)}</div>

              <ProductQuantityControls
                      productId={product._id}
                      quantities={quantities}
                      setQuantities={setQuantities}
                    />
             

  {/* Action Buttons */}
  <div className="d-flex justify-content-center align-items-center gap-2">
                  

    <button
      className="btn btn-outline-secondary btn-sm"
      onClick={() => setSelectedProduct(product)}
    >
      <i className="bi bi-list"></i>
    </button>
    <button
      className="btn btn-outline-primary btn-sm"
     onClick={() => onAddToCart({ ...product, quantity: quantities[product._id] })}

    >
      <i className="bi bi-cart"></i>
    </button>
    
     <button
                        className={`btn btn-sm ${
                          wishlist.some((item) => item._id === product._id)
                            ?"btn-outline-danger" 
                            : "btn-outline-danger"
                        }`}
                        onClick={() => onAddToWishlist({ ...product, quantity: quantities[product._id] })}
                      >
                        <i
                          className={
                            wishlist.some((item) => item._id === product._id)
                              ? "bi bi-heart-fill"
                              : "bi bi-heart"
                          }
                        ></i>
                      </button>
  </div>
</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};
export default ProductCard;