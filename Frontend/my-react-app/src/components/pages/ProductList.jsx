import React, { useState, useEffect } from 'react';
import ProductCard from './productcard.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Handcrafted Brass Flying Peacock Kerala Samai Deepam Puja Diya',
      description: 'Virgin quality brass, intricate detailing, made in India.',
      price: 425,
      originalPrice: 699,
      image: '/src/assets/images/diya.jpg'
    },
  ]);

  // If you later fetch from API, replace state above with useEffect+axios

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-4" key={product.id}>
          <ProductCard product={product} onAddToCart={handleAddToCart} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
