import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductReviewSection from '../components/ProductReviewSection';
import ProductRatingSidebar from './ProductRatingSidebar';

const ReviewPage = () => {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems(Array.isArray(res.data.items) ? res.data.items : []);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h3 className="text-warning fw-bold">🪔 Thank you for your purchase!</h3>
        <p className="lead text-muted">Your feedback is a blessing to future buyers.</p>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-warning" role="status"></div>
          <p className="mt-3">Loading products for review...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="alert alert-info text-center">No products found in this order.</div>
      ) : (
        items.map((item, index) => {
          const productId = item.productId._id || item.productId;
          return (
            <div key={productId || index} className="row mb-5">
              {/* Left: Rating Sidebar */}
              <div className="col-md-4">
                <ProductRatingSidebar productId={productId} />
              </div>

              {/* Right: Review Form */}
              <div className="col-md-8">
                <ProductReviewSection
                  productId={productId}
                  productName={item.name}
                  productImage={item.image}
                />
              </div>
            </div>
          );
        })
      )}
        <Link to="/" style={styles.button}>
          Continue Shopping
        </Link>
    </div>
  );
};
const styles = {
  
  button: {
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    border: 'none',
    color: 'white',
    padding: '12px 24px',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    marginTop: '20px'
  }
};



export default ReviewPage;