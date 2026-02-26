// components/ProductRatingSidebar.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductRatingSidebar = ({ productId }) => {
  const [ratingData, setRatingData] = useState({
    averageRating: 0,
    ratingCount: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${productId}/summary`);
        setRatingData(res.data);
      } catch (err) {
        console.error('Failed to fetch rating summary:', err);
      }
    };
    fetchRating();
  }, [productId]);

  return (
    <div style={styles.card}>
      <h4 style={styles.header}>Average Rating</h4>
      <div style={styles.average}>{ratingData.averageRating} ★</div>
      <p style={styles.count}>{ratingData.ratingCount} Reviews</p>

      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} className="d-flex align-items-center mb-2">
          <span style={styles.starLabel}>{star} ★</span>
          <div className="progress flex-grow-1" style={styles.progressContainer}>
            <div
              style={{
                width: `${ratingData.breakdown[star] || 0}%`,
                backgroundColor: '#d4af37',
                borderRadius: '4px'
              }}
            ></div>
          </div>
          <span style={styles.percentage}>{ratingData.breakdown[star] || 0}%</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    background: '#fff3e0',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.1)',
    textAlign: 'center',
    marginBottom: '20px',
    border: '1px solid #ffe0b2'
  },
  header: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#8d6e63',
    marginBottom: '15px'
  },
  average: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#d4af37'
  },
  count: {
    color: '#a1887f',
    marginBottom: '20px'
  },
  starLabel: {
    width: '40px',
    color: '#5d4037',
    fontWeight: '500'
  },
  progressContainer: {
    height: '10px',
    backgroundColor: '#fff8e1',
    borderRadius: '5px',
    display: 'flex'
  },
  percentage: {
    width: '45px',
    fontSize: '0.9rem',
    color: '#8d6e63',
    textAlign: 'right'
  }
};

export default ProductRatingSidebar;