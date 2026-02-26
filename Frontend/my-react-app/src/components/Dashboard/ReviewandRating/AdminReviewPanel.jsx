import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReviewPanel = () => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(res.data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const handleFlag = async (id) => {
    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}/flag`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setReviews(prev => prev.map(r => r._id === id ? { ...r, isFlagged: true } : r));
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setReviews(prev => prev.filter(r => r._id !== id));
  };

  const handleAddToTestimonial = async (id) => {
    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}/testimonial`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setReviews(prev => prev.map(r => r._id === id ? { ...r, isTestimonial: true } : r));
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4" style={{ color: '#713200' }}>🛡️ Review Moderation</h3>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" style={{ color: '#713200' }}></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="alert alert-info">No reviews found.</div>
      ) : (
        reviews.map((review) => {
          // Build the correct image URL (same logic as productitem.jsx)
          const imageUrl = review.productId?.image?.startsWith('http')
            ? review.productId.image
            : `${import.meta.env.VITE_BACKEND_URL}${review.productId?.image}`;

          return (
            <div key={review._id} className="card mb-3 shadow-sm border-0" style={{ borderRadius: '10px', borderLeft: '4px solid #713200' }}>
              <div className="card-body">
                {/* Product Info Row */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  {review.productId?.image ? (
                    <img
                      src={imageUrl}
                      alt={review.productId?.name || 'Product'}
                      style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #d4af37' }}
                    />
                  ) : (
                    <div style={{ width: '72px', height: '72px', borderRadius: '8px', background: '#f5e1a4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                      📦
                    </div>
                  )}
                  <div>
                    <p className="mb-0 fw-bold" style={{ color: '#713200', fontSize: '0.95rem' }}>
                      {review.productId?.name || 'Unknown Product'}
                    </p>
                    <p className="mb-0 text-muted small">Product ID: {review.productId?._id || '—'}</p>
                  </div>
                </div>

                {/* Review Content */}
                <h6 className="mb-1 fw-bold" style={{ color: '#4a1700' }}>
                  {review.username} — {review.rating} ★
                </h6>
                <p className="card-text text-secondary mb-3">{review.comment}</p>

                {/* Action Buttons */}
                <div className="d-flex gap-2 flex-wrap">
                  {!review.isFlagged && (
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleFlag(review._id)}>
                      🚩 Flag
                    </button>
                  )}
                  {!review.isTestimonial && (
                    <button className="btn btn-sm btn-outline-success" onClick={() => handleAddToTestimonial(review._id)}>
                      🌟 Add to Testimonials
                    </button>
                  )}
                  <button className="btn btn-sm btn-outline-dark" onClick={() => handleDelete(review._id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AdminReviewPanel;