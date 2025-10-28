const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  amount: Number, // ₹ or $
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCollection', required: true },
      name: String,
      quantity: { type: Number, default: 1 }
    }
  ]

});

module.exports = mongoose.model('Order', orderSchema);