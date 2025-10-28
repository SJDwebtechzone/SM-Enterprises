const mongoose = require('mongoose');

const pageVisitSchema = new mongoose.Schema({
  page: String,
  visits: { type: Number, default: 0 }
});

module.exports = mongoose.model('PageVisit', pageVisitSchema);