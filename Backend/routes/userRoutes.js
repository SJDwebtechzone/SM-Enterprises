const express = require('express');
const {
  // addToWishlist,
  // getWishlist,
  addToCart,
  getCart,removeFromCart,clearCart
} = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');


const router = express.Router();

// router.post('/wishlist/:productId', authenticateUser, addToWishlist);
// router.get('/wishlist', authenticateUser, getWishlist);
router.post('/cart/:productId', authenticateUser, addToCart);

router.post('/clear', authenticateUser, clearCart);

router.get('/cart', authenticateUser, getCart);
// DELETE /api/user/cart/:productId
router.delete('/cart/:productId', authenticateUser, removeFromCart);

module.exports = router;