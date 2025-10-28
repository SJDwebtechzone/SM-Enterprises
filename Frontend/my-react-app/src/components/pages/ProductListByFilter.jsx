import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');

  const fetchProducts = (size = '') => {
    const url = size ? `${import.meta.env.VITE_BACKEND_URL}/api/products?size=${size}` : `${import.meta.env.VITE_BACKEND_URL}/api/products`;
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);
    fetchProducts(size);
  };

  return (
    <div className="container mt-4">
      <h4>Filter Products by Size</h4>
      <select className="form-select mb-3" value={selectedSize} onChange={handleSizeChange}>
        <option value="">All Sizes</option>
        <option value="S">Small (S)</option>
        <option value="M">Medium (M)</option>
        <option value="L">Large (L)</option>
        <option value="XL">Extra Large (XL)</option>
      </select>

      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹{product.price}</p>
                <p className="card-text"><strong>Sizes:</strong> {product.sizes.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;