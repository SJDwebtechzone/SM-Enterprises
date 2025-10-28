const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  amount: Number,
  status: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [
  {
    name: String,
    price: Number
  }
]
});

module.exports = mongoose.model('Invoice', InvoiceSchema);