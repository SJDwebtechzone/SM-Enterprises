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
    <div className="card shadow-sm border-0 p-4 text-center mb-4">
      <h4 className="fw-bold">Average Rating</h4>
      <div className="display-4 text-warning fw-bold">{ratingData.averageRating} ★</div>
      <p className="text-muted">{ratingData.ratingCount} Reviews</p>

      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} className="d-flex align-items-center mb-2">
          <span className="me-2">{star} ★</span>
          <div className="progress flex-grow-1" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-warning"
              style={{ width: `${ratingData.breakdown[star] || 0}%` }}
            ></div>
          </div>
          <span className="ms-2 text-muted">{ratingData.breakdown[star] || 0}%</span>
        </div>
      ))}

      {/* <div className="mt-4">
        <h6 className="fw-bold">Write your Review</h6>
        <p className="text-muted small">
          Share your feedback and help create a better shopping experience for everyone.
        </p>
        <button className="btn btn-outline-warning">Submit Reviews</button>
      </div> */}
    </div>
  );
};

export default ProductRatingSidebar;