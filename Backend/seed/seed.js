require('dotenv').config();
const connectDB = require('../config/db');
const seedProducts = require('./seedProducts');
const seedCollections = require('./productCatalogSeeder');

connectDB().then(() => {
  console.log('✅ Connected to MongoDB');
  seedProducts();
  seedCollections();
});