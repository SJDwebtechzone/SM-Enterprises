// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductReviewSection = ({ productId, productName, productImage }) => {
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
//         setReviews(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error('Failed to fetch reviews:', err);
//         setReviews([]);
//       }
//     };

//     fetchReviews();
//   }, [productId]);

//   const handleSubmit = async () => {
//   try {
//     const token = localStorage.getItem('token');

//     await axios.post(
//       'http://localhost:5000/api/reviews',
//       { productId, rating, comment },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setRating(5);
//     setComment('');

//     const res = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
//     setReviews(Array.isArray(res.data) ? res.data : []);
//   } catch (err) {
//     if (err.response?.status === 403) {
//       alert('🛑 Only verified buyers can review this product.');
//     } else if (err.response?.status === 400) {
//       alert('⚠️ You have already reviewed this product.');
//     } else {
//       console.error('Review submission failed:', err);
//       alert('Something went wrong while submitting your review.');
//     }
//   }
// };

// // const handleSubmit = async () => {
// //   try {
// //     const token = localStorage.getItem('token');

// //     const res = await axios.post(
// //       'http://localhost:5000/api/reviews',
// //       { productId, rating, comment },
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     // ✅ Optimistically add the new review to the list
// //     const newReview = res.data.review;
// //     setReviews((prev) => [newReview, ...prev]);

// //     // ✅ Reset form
// //     setRating(5);
// //     setComment('');

// //     // ✅ Optional: show success message
// //     alert('🌟 Your review has been submitted!');
// //   } catch (err) {
// //     if (err.response?.status === 403) {
// //       alert('🛑 Only verified buyers can review this product.');
// //     } else if (err.response?.status === 400) {
// //       alert('⚠️ You have already reviewed this product.');
// //     } else {
// //       console.error('Review submission failed:', err);
// //       alert('Something went wrong while submitting your review.');
// //     }
// //   }
// // };

//   return (
//     <div className="card shadow-sm border-0">
//   <div className="card-body">
//     {productName && (
//       <h5 className="card-title text-info fw-bold">{productName}</h5>
//     )}

//     {productImage && (
//       <div className="text-center mb-3">
//         <img
//           src={productImage}
//           alt={productName}
//           className="img-thumbnail"
//           style={{ maxWidth: '180px' }}
//         />
//       </div>
//     )}

//     <h6 className="text-success mb-3">🌟 Customer Reviews</h6>

//     <div
//       className="mb-4 overflow-auto"
//       style={{ maxHeight: '250px' }}
//     >
//       {Array.isArray(reviews) && reviews.length > 0 ? (
//         reviews.map((r) => (
//           <div key={r._id} className="border rounded p-3 mb-3 bg-light">
//             <div className="d-flex justify-content-between align-items-center">
//               <strong>{r.username}</strong>
//               <span className="badge bg-warning text-dark">★ {r.rating}</span>
//             </div>
//             <p className="mb-1">{r.comment}</p>
//             <p className="text-muted small mb-0">🙏 Blessed by {r.username}</p>
//           </div>
//         ))
//       ) : (
//         <p className="text-muted">No reviews yet. Be the first to bless this product!</p>
//       )}
//     </div>

//     <div className="mt-4">
//       <h6 className="text-primary">📝 Write a Review</h6>
//       <div className="row g-3 align-items-start">
//         <div className="col-md-3">
//           <select
//             className="form-select"
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//           >
//             {[1, 2, 3, 4, 5].map((n) => (
//               <option key={n} value={n}>
//                 {n} Star{n > 1 ? 's' : ''}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-9">
//           <textarea
//             className="form-control"
//             placeholder="Share your experience..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows={2}
//           />
//         </div>
//       </div>
//       <div className="text-end mt-3">
//         <button className="btn btn-warning" onClick={handleSubmit}>
//           🟡 Submit Review
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
//   );
// };

// export default ProductReviewSection;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductReviewSection = ({ productId, productName, productImage }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${productId}`);
        setReviews(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        { productId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRating(5);
      setComment('');

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${productId}`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 403) {
        alert('🛑 Only verified buyers can review this product.');
      } else if (err.response?.status === 400) {
        alert('⚠️ You have already reviewed this product.');
      } else {
        console.error('Review submission failed:', err);
        alert('Something went wrong while submitting your review.');
      }
    }
  };

  return (
    <div style={styles.card}>
      <div className="card-body">
        {productName && <h5 style={styles.productName}>{productName}</h5>}
        {productImage && (
          <div className="text-center mb-4">
            <img
              src={productImage}
              alt={productName}
              style={styles.productImage}
            />
          </div>
        )}

        <div style={styles.reviewsContainer}>
          <h6 style={styles.subHeader}>🌟 Customer Blessings</h6>
          <div style={styles.scrollArea}>
            {Array.isArray(reviews) && reviews.length > 0 ? (
              reviews.map((r) => (
                <div key={r._id} style={styles.reviewCard}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h6 className="mb-0 fw-bold" style={{ color: '#5d4037' }}>{r.username}</h6>
                      {r.updatedAt && <small style={{ color: '#a1887f' }}>{new Date(r.updatedAt).toLocaleDateString()}</small>}
                    </div>
                    <span style={styles.ratingBadge}>★ {r.rating}</span>
                  </div>
                  <p className="mb-0" style={{ color: '#5d4037' }}>{r.comment}</p>
                </div>
              ))
            ) : (
              <div style={styles.emptyText}>No reviews yet. Be the first to bless this product! ✨</div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h6 style={styles.subHeader}>📝 Leave a Blessing</h6>
          <div className="row g-3">
            <div className="col-md-3">
              <select
                className="form-select"
                style={styles.select}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-9">
              <textarea
                className="form-control"
                style={styles.textarea}
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <div className="text-end mt-3">
            <button style={styles.submitButton} onClick={handleSubmit}>
              Submit Blessing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff3e0',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.1)',
    border: '1px solid #ffe0b2',
    padding: '10px'
  },
  productName: {
    color: '#8d6e63',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    marginBottom: '20px',
    textAlign: 'center'
  },
  productImage: {
    maxWidth: '150px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '3px solid #fff'
  },
  reviewsContainer: {
    background: '#fff8e1',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px'
  },
  subHeader: {
    color: '#8d6e63',
    fontWeight: 'bold',
    marginBottom: '15px',
    fontSize: '1.1rem'
  },
  scrollArea: {
    maxHeight: '300px',
    overflowY: 'auto',
    paddingRight: '10px'
  },
  reviewCard: {
    background: '#fff',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    borderLeft: '4px solid #d4af37',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  ratingBadge: {
    background: '#d4af37',
    color: '#fff',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  },
  emptyText: {
    color: '#a1887f',
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic'
  },
  select: {
    border: '1px solid #ffe0b2',
    borderRadius: '8px',
    color: '#5d4037'
  },
  textarea: {
    border: '1px solid #ffe0b2',
    borderRadius: '10px',
    color: '#5d4037',
    resize: 'none'
  },
  submitButton: {
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    border: 'none',
    color: 'white',
    padding: '10px 25px',
    fontSize: '1rem',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(212, 175, 55, 0.3)'
  }
};

export default ProductReviewSection;