const mongoose = require('mongoose');

const orderHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number
      }
    ],
  total: Number,
  status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderHistory', orderHistorySchema);