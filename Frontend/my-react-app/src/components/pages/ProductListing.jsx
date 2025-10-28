import React from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import diya1 from '../../assets/images/bg_7.jpg';
import diya2 from '../../assets/images/diya1.jpg';

const products = [
  { name: 'Steel Vilakku', category: 'Aarti Diya', price: 120, sale: 80, image: diya1 },
  { name: 'Brass Diya', category: 'Brass Designer Diya', price: 150, sale: 100, image: diya2 },
  { name: 'Akhand Jyoti', category: 'Akhand Diya', price: 300, sale: 250, image: diya1 },
  { name: 'Chimney Glow', category: 'Chimney Diya', price: 200, sale: 180, image: diya2 },
];

const ProductListing = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const filteredProducts = products.filter(
    (product) => product.category === decodedCategory
  );

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">{decodedCategory} Products</h2>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="col-12 col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ₹{product.sale}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;