require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const otpRoutes = require('./routes/otpRoutes');

const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const productCollectionRoutes = require('./routes/productCollectionRoutes');
// const seedDatabase = require('./seed/seedProducts');
// const seedDatabaseCollection=require('./seed/productCatalogSeeder')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/ProductRoutess');
const protect = require('./middleware/authMiddleware');
const wishlistRoutes = require('./routes/wishlist');
const productRatingsRoutes = require('./routes/ProductRating');
const productRoutesManager = require('./routes/ProductManager');
const contactRoute = require('./routes/contact');
// import promoRoutes from './routes/promos.js';
// import adminPromoRoutes from './routes/adminPromos.js';
const promoRoutes= require('./routes/promos')
const adminPromoRoutes= require('./routes/adminPromos')
const filterbyprice=require('./routes/filterByPrice')
const metricsRoutes = require('./routes/metrics');
const orderRoutes = require('./routes/orders');

const productStatsRoutes = require('./routes/productStats');

const AdminorderRoutes = require('./routes/adminOrderRoutes');
const dashboardbestsellingstock = require('./routes/dashboardbestselling&stock');

const createOrder = require('./routes/createOrder');
const verifyPayment = require('./routes/verifyPayment');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/reviewRoutes'); 
const adminImageRoutes=require('./routes/adminImages');
const orderHistoryRoutes = require('./routes/orderHistory');








const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}





// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(bodyParser.json());


// Static image folder
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/invoices', express.static(path.join(__dirname, 'public/invoices')));


// Connect to MongoDB
connectDB();

// Seed database
// seedDatabase();
// seedDatabaseCollection();

// Routes
app.use('/api', otpRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);
app.use('/api/user', productsRoutes);



app.use('/api/products', productRoutes);   
app.use('/api/wishlist', wishlistRoutes);

app.use('/api/products', productRatingsRoutes);
app.use('/api/products', productRoutesManager);
app.use('/api/contact', contactRoute);
app.use('/api/promos', promoRoutes);
app.use('/api/admin/promos', adminPromoRoutes);
app.use('/api/products', filterbyprice);
app.use('/api', metricsRoutes); // Mounts /api/metrics
app.use('/api', orderRoutes);
app.use('/api', productStatsRoutes);

app.use('/api/orders', AdminorderRoutes);
app.use('/api/bestandstock', dashboardbestsellingstock);

app.use('/api/create-order', createOrder);
app.use('/api/verify-payment', verifyPayment);
app.use('/admin',adminRoutes);

app.use('/api/reviews', reviewRoutes); 
app.use('/api/admin/images', adminImageRoutes);

app.use('/api/orderhistory', orderHistoryRoutes);
app.use('/api/categories', require('./routes/categoryRoutes'));






// 🔐 Protected route
app.get('/api/profile', protect, (req, res) => {
  res.json({ message: 'Protected route accessed', userId: req.user });
});
// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// app.use('/api/collections', productRoutes); 
// app.use('/api/products/search', productRoutes); 

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
