import React, { useState } from 'react';

const ReviewDetailPage = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const reviews = [
    {
      name: 'Rachel Patel',
      date: 'October 5, 2023',
      rating: 5,
      comment:
        "Couldn't resist buying this watch after seeing it online, and I'm so glad I did. It's even more stunning in person, and the quality is amazing. Will definitely be purchasing from this brand again!",
    },
    {
      name: 'Christopher Lee',
      date: 'June 25, 2023',
      rating: 4,
      comment:
        "Really impressed with the quality and style of this watch. It's exactly what I was looking for – versatile, durable, and looks great with any outfit. Docked half a star because the clasp is a bit tricky to open, but otherwise, it's perfect!",
    },
    {
      name: 'Brian Chen',
      date: 'April 15, 2022',
      rating: 3,
      comment:
        "While this watch has its merits, such as its sleek design and comfortable wear, I found the strap to be somewhat flimsy, and the clasp occasionally difficult to secure. Despite these minor drawbacks, it does keep accurate time.",
    },
  ];

  const handleSubmit = () => {
    alert('🌟 Review submitted!');
    setRating(5);
    setComment('');
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Average Rating Section */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center">
            <h4 className="fw-bold">Average Rating</h4>
            <div className="display-4 text-warning fw-bold">4.5 ★</div>
            <p className="text-muted">50K Reviews</p>

            {[5, 4, 3, 2, 1].map((star, i) => {
              const percentages = [90, 8, 1, 0, 1];
              return (
                <div key={star} className="d-flex align-items-center mb-2">
                  <span className="me-2">{star} ★</span>
                  <div className="progress flex-grow-1" style={{ height: '8px' }}>
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: `${percentages[i]}%` }}
                    ></div>
                  </div>
                  <span className="ms-2 text-muted">{percentages[i]}%</span>
                </div>
              );
            })}

            <div className="mt-4">
              <h6 className="fw-bold">Write your Review</h6>
              <p className="text-muted small">
                Share your feedback and help create a better shopping experience for everyone.
              </p>
              <button className="btn btn-outline-warning">Submit Reviews</button>
            </div>
          </div>
        </div>

        {/* Customer Feedback Section */}
        <div className="col-md-8">
          <h4 className="fw-bold mb-4">Customer Feedback</h4>
          <div className="overflow-auto mb-4" style={{ maxHeight: '400px' }}>
            {reviews.map((r, index) => (
              <div key={index} className="card mb-3 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h6 className="mb-0 fw-bold">{r.name}</h6>
                      <small className="text-muted">{r.date}</small>
                    </div>
                    <span className="badge bg-warning text-dark fs-6">★ {r.rating}</span>
                  </div>
                  <p className="mb-0">{r.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Review Form */}
          <div className="card shadow-sm border-0 p-4">
            <h5 className="text-primary fw-bold mb-3">📝 Write a Review</h5>
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
              <div className="col-md-9">
                <textarea
                  className="form-control"
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
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
    </div>
  );
};

export default ReviewDetailPage;