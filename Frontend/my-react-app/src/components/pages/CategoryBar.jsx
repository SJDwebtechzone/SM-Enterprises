import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from './productitem';
import diya1 from '../../assets/images/bg_7.jpg';
import diya2 from '../../assets/images/diya1.jpg';
import '../../assets/css/css/CategoryBar.css'
import ProductList from './ProductListByFilter';
import bgimage from '../../assets/images/Hindu_Devotional_Bac.png'

// const categoriesList = [
//   'Brass Bell',
//   'Hundi',
//   'Kalasam',
//   'Steel Vilakku',
//   'Electric Bell'
// ];


const CategorySidebar = ({ onAddToCart, onAddToWishlist,wishlist}) => {
  const [price, setPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
   const [products, setProducts] = useState([]);
   const [categoriesList, setCategoriesList] = useState([]);
   console.log('products',products)

  
  const [selectedSize, setSelectedSize] = useState('');

  const fetchProducts = (size = '') => {
    const url = size ? `${import.meta.env.VITE_BACKEND_URL}/api/products?size=${size}` : `${import.meta.env.VITE_BACKEND_URL}/api/products`;
    // 
    fetch(url)
  .then(res => res.json())
 .then(data => setProducts(data || [])) // ✅ extract array
  .catch(err => console.error('Error fetching products:', err));
  };

  useEffect(() => {
  fetchProducts();
  fetchCategories(); // ✅ fetch categories dynamically
}, []);

const fetchCategories = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
    setCategoriesList(res.data || []);
  } catch (err) {
    console.error('Category fetch failed:', err);
  }
};

  const handleSizeChange = (e) => {
  const size = e.target.value;
  setSelectedSize(size);
    setSelectedCategory(null);
  setPrice(0); // 👈 Reset price when size changes
  fetchProducts(size);
};


// useEffect(() => {
//     // Fetch products from your backend
//     axios.get('http://localhost:5000/api/products')
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);



  
useEffect(() => {
  const updatedList = products.filter((product) => {
    const isWithinPrice = price > 0 ? product.sale <= price : true;
   const isMatchingCategory = selectedCategory
  ? product.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
  : true;
    const isMatchingSize = selectedSize
      ? product.sizes?.includes(selectedSize)
      : true;

    return isWithinPrice && isMatchingCategory && isMatchingSize;
  });

  setFilteredProducts(updatedList);
}, [selectedCategory, price, selectedSize, products]);

 const handlePriceChange = (e) => {
  const newPrice = Number(e.target.value);
  setPrice(newPrice);
  setSelectedSize(''); // 👈 Reset size when price changes

  if (newPrice > 0 && selectedCategory) {
    setSelectedCategory(null);
  }
};

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSize(''); 
    setPrice(0);
  };

  return (
    <div className="container-fluid" style={{
            
            // background: " rgba(223, 199, 15, 0.4)",
             background:"white"
            


            
          }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 py-4">
          <h5 className="fw-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Categories
          </h5>
          {/* <ul className="list-group mb-4">
            {categoriesList.map((category, index) => (
              <li
                key={index}
                className={`list-group-item list-group-item-action ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
                style={{ cursor: 'pointer' }}
              >
                {category}
              </li>
            ))}
          </ul> */}
          
<ul className="list-group mb-4">
  {categoriesList.map((cat, index) => {
    const categoryName = typeof cat === 'string' ? cat : cat.name;
    return (
      <li
        key={index}
        className={`list-group-item list-group-item-action ${selectedCategory === categoryName ? 'active' : ''}`}
        onClick={() => handleCategoryClick(categoryName)}
        style={{ cursor: 'pointer' }}
      >
        {categoryName}
      </li>
    );
  })}
</ul>
          <h5 className="fw-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Filter by Price
          </h5>
          <div className="d-flex justify-content-between text-muted mb-1 px-1">
            <span>₹0</span>
            <span>₹5000</span>
          </div>
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <input
              type="range"
              className="form-range"
              min="0"
              max="5000"
              step="100"
              value={price}
              onChange={handlePriceChange}
              style={{ zIndex: 1 }}
            />
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: `${(price / 5000) * 100}%`,
                transform: 'translateX(-50%)',
                marginTop: '4px',
                fontSize: '14px',
                color: '#6c757d',
                fontWeight: '500',
              }}
            >
              ₹{price}
            </div>
          </div>
          <div>
          <h5 className="fw-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Filter by Sizes
          </h5>
      <select className="form-select mb-3" value={selectedSize} onChange={handleSizeChange}>
        <option value="">All Sizes</option>
        <option value="S">Small (S)</option>
        <option value="M">Medium (M)</option>
        <option value="L">Large (L)</option>
        
      </select>
      </div>
        </div>

        {/* Product Grid */}
        <div className="col-12 col-md-9 py-4">
          {filteredProducts.length > 0 ? (
            <ProductCard
              products={filteredProducts}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist} // ✅ Pass wishlist handler here
              wishlist={wishlist}
            />
          ) : (
            <p className="text-muted">No products found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;