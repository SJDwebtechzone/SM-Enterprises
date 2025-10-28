const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCollection', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  isFlagged: { type: Boolean, default: false },
  isTestimonial: { type: Boolean, default: false } // ✅ New field
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);