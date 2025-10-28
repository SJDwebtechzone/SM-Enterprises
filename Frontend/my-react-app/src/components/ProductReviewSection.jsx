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
    <div className="card shadow-sm border-0">
      <div className="card-body">
        {productName && <h5 className="card-title text-info fw-bold text-dark">{productName}</h5>}
        {productImage && (
          <div className="text-center mb-3">
            <img
              src={productImage}
              alt={productName}
              className="img-thumbnail"
              style={{ maxWidth: '180px' }}
            />
          </div>
        )}




<div className="card shadow-sm border-0 " style={{backgroundColor: '#dddad3ff', maxHeight: '400px', overflowY: 'auto' }}>
  <div className="card-body">
    {Array.isArray(reviews) && reviews.length > 0 ? (
      reviews.map((r) => (
        <div key={r._id} className="card mb-3 shadow-sm border-0 "  style={{ backgroundColor: '#fff9e6' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 className="mb-0 fw-bold">{r.username}</h6>
                {r.updatedAt && <small className="text-muted">{r.updatedAt}</small>}
              </div>
              <span className="badge bg-warning text-dark fs-6">★ {r.rating}</span>
            </div>
            <p className="mb-0">{r.comment}</p>
          </div>
        </div>
      ))
    ) : (
      <div className="text-muted">No reviews yet. Be the first to bless this product!</div>
    )}
  </div>
</div>


        <div className="mt-4">
          {/* <h6 className="text-primary">📝 Write a Review</h6> */}
          <div className="row g-3 align-items-start">
            <div className="col-md-3">
              <select
                className="form-select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-9" style={{padding:'0px'}}>
              <textarea
                className="form-control"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
              />
            </div>
          </div>
          <div className="text-end mt-3">
            <button className="btn btn-warning" onClick={handleSubmit}>
              🟡 Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;