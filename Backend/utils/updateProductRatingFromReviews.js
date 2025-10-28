// utils/updateProductRatingFromReviews.js
const Review = require('../models/Review');
const ProductCollection = require('../models/ProductCollection');

async function updateProductRatingFromReviews(productId) {
  const reviews = await Review.find({ productId, isFlagged: false });

  const ratingCount = reviews.length;
  const averageRating = ratingCount === 0
    ? 0
    : reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount;

  await ProductCollection.findByIdAndUpdate(productId, {
    averageRating: parseFloat(averageRating.toFixed(1)),
    ratingCount,
  });
}

module.exports = updateProductRatingFromReviews;