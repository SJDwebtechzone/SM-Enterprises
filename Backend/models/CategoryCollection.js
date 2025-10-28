const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  image: { type: String },

   

  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  
});

module.exports = mongoose.model('CategoryCollection', categorySchema);