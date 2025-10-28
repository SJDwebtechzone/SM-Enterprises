const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Link to logged-in user
  orderId: String,

  orderId: String,
  invoiceId: String,
  trackingId: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  discount: { type: Number, default: 0 },
  couponCode: String,
  status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
  paymentMethod: String,
  date: { type: Date, default: Date.now },
  deliveryDate: Date,
  deliveryMethod: String,
  notes: String,
  adminComment: String,
  paymentId:String,
  pdfUrl:String,
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('AdminOrder', orderSchema);