const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  category: String,
  description: String,
  price: Number,
  originalPrice: Number,
  discount: String,
  sale: Number,
  image: String,
  offers: [String],
  sku: String,
  stock: { type: Number, default: 0 },
  details: {
    Material: String,
    Dimensions: String,
    About: String,
  },
  rating: { type: Number, default: 0 },
reviews: [{
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  stars: Number,
  createdAt: { type: Date, default: Date.now }
}]
});

module.exports = mongoose.model('Product', productSchema);