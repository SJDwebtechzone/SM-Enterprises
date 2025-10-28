import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductDetail from "./ProductDetails";
import ProductQuantityControls from "./ProductQualityControl";
import '../../assets/css/css/ProductItem.css'

const categoryMap = {
  "brass-bell": "Brass Bell",
  "hundi": "Hundi",
  "electric-bell": "Electric Bell",
  "steel-vilakku": "Steel Vilakku",
  "kalasam": "Kalasam",
};

const ProductSearch = ({ onAddToCart, onAddToWishlist, wishlist = [] }) => {
  const { category } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});

  const decodedCategory = category
    ? categoryMap[category.toLowerCase()] || category
    : "Search Results";

  useEffect(() => {
    if (query) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/search?query=${query}`)
        .then((res) => {
          setProducts(res.data);
          const initialQuantities = res.data.reduce((acc, product) => {
            acc[product._id] = 1;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        })
        .catch((err) => console.error("Search failed:", err));
    }
  }, [query]);

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
    <div className="container-fluid py-5" style={{
            
            // background: " rgba(223, 199, 15, 0.4)",
             background:"white"
            


            
          }}>
      <h2 className="mb-4">
        {query ? `Search Results for "${query}"` : decodedCategory}
      </h2>

      {products.length > 0 ? (
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4">
              <div className="card product-card h-100 shadow-sm border-1">
                <div className="position-relative">
                  <img
                    src={product.image?.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}${product.image}`}
                    alt={product.name}
                    className="card-img-top product-image"
                  />
                  {product.discount && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                      {product.discount}
                    </span>
                  )}
                </div>
                <div className="card-body product-body text-center">
                  <h5 className="card-title product-title" style={{ color: '#30272bff' }}>
                    {product.name}
                  </h5>
                  <div className="pricing">
                    {product.sale ? (
                      <p className="mb-2">
                        <span className="text-muted text-decoration-line-through me-2">
                          ₹{product.price}
                        </span>
                        <span className="text-success fw-bold">₹{product.sale}</span>
                      </p>
                    ) : (
                      <p className="mb-2 fw-bold">₹{product.price}</p>
                    )}
                  </div>

                  {/* Quantity Controls */}
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
                        onClick={() =>
                          onAddToCart({ ...product, quantity: quantities[product._id] })
                        }
                      >
                        <i className="bi bi-cart"></i>
                      </button>
                      <button
                        className={`btn btn-sm ${
                          wishlist.some((item) => item._id === product._id)
                            ? "btn-outline-danger"
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
      ) : (
        <p className="text-muted">No products found for this search.</p>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default ProductSearch;