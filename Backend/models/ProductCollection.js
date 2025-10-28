const mongoose = require('mongoose');

const productCollectionSchema = new mongoose.Schema({
  name: String,
  type: String,
 category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryCollection', required: true },
  subcategory: String,
  description: String,
  price: Number,
  originalPrice: Number,
  discount: String,
  sale: Number,
  sizes: [String],
  image: String,
  offers: [String],
  sku: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // ✅ status field
  stock: { type: Number, default: 0 }, // ✅ current stock
  alertThreshold: { type: Number, default: 5 }, // ✅ stock alert trigger
  sold: { type: Number, default: 0 }, // ✅ total units sold

  details: {
    Material: String,
    Dimensions: String,
    About: String,
  },

  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    }
  ],
  averageRating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('ProductCollection', productCollectionSchema);