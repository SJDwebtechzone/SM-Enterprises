// models/Wishlist.js
const mongoose = require('mongoose');

// const wishlistSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCollection', required: true  },
//       addedAt: { type: Date, default: Date.now }
//     }
//   ]
// });
const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductCollection' }]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);