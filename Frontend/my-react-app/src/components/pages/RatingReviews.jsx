import React, { useState } from 'react';
import '../../assets/css/css/RatingReview.css'; // Optional: for custom styles

function RatingReview({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 ) {
      onSubmit({ rating });
      setRating(0);
    //   setReview('');
    }
  };

  return (
    <div className="mt-3 p-3 border rounded bg-light">
      {/* <h6 className="mb-3 text-center text-dark">Rate & Review</h6> */}

      {/* Star Rating */}
      <div className="d-flex justify-content-center mb-3">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={starValue}
              type="button"
              className="btn btn-link p-0 mx-1"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <i
                className={`bi ${
                  starValue <= (hover || rating)
                    ? 'bi-star-fill text-warning'
                    : 'bi-star text-muted'
                } fs-5`}
              ></i>
            </button>
          );
        })}
      </div>

      {/* Review Text */}
      {/* <div className="mb-3">
        <textarea
          className="form-control"
          rows="2"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div> */}

      {/* Submit Button */}
      <div className="d-grid">
        <button type="submit" className="btn btn-sm btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default RatingReview;