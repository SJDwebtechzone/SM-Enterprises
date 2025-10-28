//models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);

// const mongoose = require('mongoose');

// const imageSchema = new mongoose.Schema({
//   url: String,
//   title: String,
//   uploadedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Image', imageSchema);