import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReviewManager = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/reviews', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setReviews(res.data));
  }, []);

  const handleFlag = async (id) => {
    const token = localStorage.getItem('token');
    await axios.patch(`/api/reviews/${id}/flag`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const res = await axios.get('/api/reviews', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setReviews(res.data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setReviews(reviews.filter(r => r._id !== id));
  };

  return (
    <div className="p-4">
      <h4>Review Manager</h4>
      {reviews.map(r => (
        <div key={r._id} className="border p-3 mb-2">
          <strong>{r.username}</strong> on <em>{r.productId?.name}</em> ★ {r.rating}
          <p>{r.comment}</p>
          <button className="btn btn-warning me-2" onClick={() => handleFlag(r._id)}>Flag</button>
          <button className="btn btn-danger" onClick={() => handleDelete(r._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminReviewManager;