const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  message: String,
  active: Boolean,
});


module.exports = mongoose.model('Promo', promoSchema);