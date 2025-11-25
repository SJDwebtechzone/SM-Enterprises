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
      <h3 className="fw-bold text-warning mb-4">🛡️ Review Moderation</h3>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-warning"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="alert alert-info">No reviews found.</div>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p className="text-muted small">
                <img src={review.productId?.image} alt={review.productId?.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  className="img-fluid rounded" />
                Product: {review.productId?.name || 'Unknown Product'}
              </p>
              <h5 className="card-title">{review.username} — {review.rating} ★</h5>
              <p className="card-text">{review.comment}</p>
              <div className="d-flex gap-2">
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
        ))
      )}
    </div>
  );
};

export default AdminReviewPanel;