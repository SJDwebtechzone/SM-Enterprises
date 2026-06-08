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
  

  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFeet, setSelectedFeet] = useState('');

  const fetchProducts = (size = '') => {
    const url = size ? `${import.meta.env.VITE_BACKEND_URL}/api/products?size=${size}` : `${import.meta.env.VITE_BACKEND_URL}/api/products`;
    
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Invalid products data format:', data);
          setProducts([]);
        }
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setProducts([]);
      });
  };

  useEffect(() => {
  fetchProducts();
  fetchCategories(); // ✅ fetch categories dynamically
}, []);

const fetchCategories = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
    
    // Check if response data is an array
    if (!res.data || !Array.isArray(res.data)) {
      console.error('Invalid categories data format:', res.data);
      setCategoriesList([]);
      return;
    }
    
    setCategoriesList(res.data);
  } catch (err) {
    console.error('Category fetch failed:', err);
    setCategoriesList([]);
  }
};

  const handleSizeChange = (e) => {
  const size = e.target.value;
  setSelectedSize(size);
    setSelectedCategory(null);
  setPrice(0); // 👈 Reset price when size changes
  setSelectedFeet(''); // 👈 Reset feet when size changes
  fetchProducts(size);
};

const handleFeetChange = (e) => {
  setSelectedFeet(e.target.value);
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

  // Extract dynamic Feet options from loaded products
  const feetOptions = Array.from(
    new Set(
      products
        .map(p => p.sku)
        .filter(sku => sku && sku.trim() !== '')
    )
  ).sort((a, b) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.localeCompare(b);
  });
  
useEffect(() => {
  const updatedList = products.filter((product) => {
    const isWithinPrice = price > 0 ? product.sale <= price : true;
   const isMatchingCategory = selectedCategory
  ? product.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
  : true;
    const isMatchingSize = selectedSize
      ? product.sizes?.some(s => {
          const val = s.trim().toLowerCase();
          const sel = selectedSize.toLowerCase();
          if (val === sel) return true;
          if (sel === 'small' && val === 's') return true;
          if (sel === 'medium' && val === 'm') return true;
          if (sel === 'large' && val === 'l') return true;
          return false;
        })
      : true;
    const isMatchingFeet = selectedFeet
      ? product.sku === selectedFeet
      : true;

    return isWithinPrice && isMatchingCategory && isMatchingSize && isMatchingFeet;
  });

  setFilteredProducts(updatedList);
}, [selectedCategory, price, selectedSize, selectedFeet, products]);

 const handlePriceChange = (e) => {
  const newPrice = Number(e.target.value);
  setPrice(newPrice);
  setSelectedSize(''); // 👈 Reset size when price changes
  setSelectedFeet(''); // 👈 Reset feet when price changes

  if (newPrice > 0 && selectedCategory) {
    setSelectedCategory(null);
  }
};

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSize(''); 
    setSelectedFeet(''); // 👈 Reset feet when category changes
    setPrice(0);
  };

  return (
    <div className="container py-4" style={{ background: "transparent" }}>
      {/* Dropdown Filters Row */}
      <div className="row g-2 mb-4 align-items-center">
        {/* Categories Dropdown */}
        <div className="col-6 col-md-3">
          <label className="form-label fw-bold text-muted small mb-1">Category</label>
          <select 
            className="form-select py-2" 
            value={selectedCategory || ''} 
            onChange={(e) => handleCategoryClick(e.target.value)}
            style={{ borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="">All Categories</option>
            {categoriesList.map((cat, index) => {
              const categoryName = typeof cat === 'string' ? cat : cat.name;
              return (
                <option key={index} value={categoryName}>
                  {categoryName}
                </option>
              );
            })}
          </select>
        </div>

        {/* Price Dropdown */}
        <div className="col-6 col-md-3">
          <label className="form-label fw-bold text-muted small mb-1">Filter by Price</label>
          <div className="dropdown">
            <button 
              className="btn btn-outline-secondary dropdown-toggle w-100 text-start py-2 d-flex justify-content-between align-items-center" 
              type="button" 
              id="priceDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
              style={{ borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', color: '#495057' }}
            >
              <span>{price > 0 ? `Max: ₹${price}` : 'Select Price Range'}</span>
            </button>
            <div className="dropdown-menu p-3" aria-labelledby="priceDropdown" style={{ width: '280px', borderRadius: '8px' }}>
              <div className="d-flex justify-content-between text-muted mb-1 px-1" style={{ fontSize: '0.85rem' }}>
                <span>₹0</span>
                <span>₹5000</span>
              </div>
              <input
                type="range"
                className="form-range"
                min="0"
                max="5000"
                step="100"
                value={price}
                onChange={handlePriceChange}
              />
              <div className="text-center mt-2 fw-semibold text-secondary" style={{ fontSize: '0.9rem' }}>
                Selected: ₹{price || '0'}
              </div>
              {price > 0 && (
                <button 
                  className="btn btn-sm btn-link text-danger d-block mx-auto mt-2 text-decoration-none" 
                  onClick={() => setPrice(0)}
                >
                  Clear Price Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sizes Dropdown */}
        <div className="col-6 col-md-3">
          <label className="form-label fw-bold text-muted small mb-1">Filter by Sizes</label>
          <select 
            className="form-select py-2" 
            value={selectedSize} 
            onChange={handleSizeChange}
            style={{ borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="">All Sizes</option>
            <option value="Zero">Zero</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Big">Big</option>
            <option value="Super Big">Super Big</option>
            <option value="Mega">Mega</option>
          </select>
        </div>

        {/* Feet Dropdown */}
        <div className="col-6 col-md-3">
          <label className="form-label fw-bold text-muted small mb-1">Filter by Feet</label>
          <select 
            className="form-select py-2" 
            value={selectedFeet} 
            onChange={handleFeetChange}
            style={{ borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="">All Feet</option>
            {feetOptions.map((feet, index) => (
              <option key={index} value={feet}>
                {feet}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid - Full Width */}
      <div className="row">
        <div className="col-12 py-2">
          {filteredProducts.length > 0 ? (
            <ProductCard
              products={filteredProducts}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              wishlist={wishlist}
            />
          ) : (
            <p className="text-muted text-center py-5">No products found matching the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;