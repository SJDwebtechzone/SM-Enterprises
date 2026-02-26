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
    <div style={styles.page}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 style={styles.title}>🪔 Thank you for your purchase!</h1>
          <p style={styles.subtitle}>Your feedback is a blessing to future buyers. ✨</p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-warning" role="status"></div>
            <p className="mt-3">Loading products for review...</p>
          </div>
        ) : items.length === 0 ? (
          <div style={styles.card} className="text-center">No products found in this order.</div>
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
        <div className="text-center">
          <Link to="/" style={styles.button}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(to bottom right, #fff8e1, #ffe0b2)',
    minHeight: '100vh',
    fontFamily: 'Roboto, sans-serif',
    color: '#5d4037',
  },
  title: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '3rem',
    color: '#d4af37',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#8d6e63',
    fontStyle: 'italic',
  },
  card: {
    background: '#fff3e0',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
    border: '1px solid #ffe0b2',
  },
  button: {
    display: 'inline-block',
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    border: 'none',
    color: 'white',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    textDecoration: 'none',
    marginTop: '30px',
    fontWeight: 'bold',
    transition: 'transform 0.2s ease',
  }
};



export default ReviewPage;