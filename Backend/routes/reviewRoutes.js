const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Review = require('../models/Review');
const authenticateUser = require('../middleware/authMiddleware');
const isAdmin=require('../middleware/isAdmin')
const AdminOrder = require('../models/AdminOrder'); // ✅ Import your Order model
const updateProductRatingFromReviews = require('../utils/updateProductRatingFromReviews');

// Create review


router.post('/', authenticateUser, async (req, res) => {
  const { productId, rating, comment } = req.body;
  const userId = req.user._id;


//   // ✅ Check if user has purchased this product
//     const orders = await AdminOrder.find({ 'customer.email': req.user.email });
//   console.log('User Orders:', JSON.stringify(orders, null, 2));

//   orders.forEach(order => {
//   console.log('Order:', order.orderId);
//   order.items.forEach(item => {
//     console.log(' - item.productId:', item.productId);
//   });
// });




// const hasPurchased = await AdminOrder.findOne({
//   'customer.email': req.user.email,
//   status: { $in: ['Paid', 'Delivered','Shipped','Pending'] },
//   'items.productId': new mongoose.Types.ObjectId(productId)
// });
const castedId = mongoose.Types.ObjectId.isValid(productId)
  ? new mongoose.Types.ObjectId(productId)
  : productId;

const hasPurchased = await AdminOrder.findOne({
  'customer.email': req.user.email,
  status: { $in: ['Paid', 'Delivered', 'Shipped', 'Pending'] },
  items: {
    $elemMatch: {
      productId: castedId
    }
  }
});

 console.log('Checking for purchase:', {
  email: req.user.email,
  productId,
  castedId,
  hasPurchased: !!hasPurchased
});



  // if (!hasPurchased) {
  //   return res.status(403).json({ error: 'Only verified buyers can review this product' });
  // }

  // ✅ Prevent duplicate reviews
  const existing = await Review.findOne({ productId, userId });
  if (existing) return res.status(400).json({ error: 'You already reviewed this product' });

  // ✅ Create review
  const review = await Review.create({
    productId,
    userId,
    username: req.user.name,
    rating,
    comment
  });
  await updateProductRatingFromReviews(productId);


  res.json({ success: true, review });
});


// Get rating summary for a product
router.get('/:productId/summary', async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ productId });

    const ratingCount = reviews.length;
    const averageRating = ratingCount === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount;

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      breakdown[r.rating] = (breakdown[r.rating] || 0) + 1;
    });

    // Convert to percentages
    Object.keys(breakdown).forEach(key => {
      breakdown[key] = ratingCount === 0
        ? 0
        : Math.round((breakdown[key] / ratingCount) * 100);
    });

    res.json({
      averageRating: averageRating.toFixed(1),
      ratingCount,
      breakdown
    });
  } catch (err) {
    console.error('Rating summary error:', err);
    res.status(500).json({ error: 'Failed to fetch rating summary' });
  }
});


// GET /api/reviews/testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Review.find({
      isTestimonial: true,
      productId: { $ne: null } // ✅ exclude broken references
    }).populate({
      path: 'productId',
      select: 'name image price status'
    });

    res.json(testimonials);
  } catch (err) {
    console.error('🔥 Error in /testimonials route:', err.stack);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get reviews for product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Admin: Get all reviews
router.get('/', authenticateUser, isAdmin, async (req, res) => {
  try {
    const reviews = await Review.find().populate('productId', 'name image');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Admin: Flag review
router.patch('/:id/flag', authenticateUser, isAdmin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isFlagged: true }, { new: true });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to flag review' });
  }
});

// Admin: Delete review
router.delete('/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    // 🔍 Find and delete the review
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // 🔁 Update product rating after deletion
    await updateProductRatingFromReviews(review.productId);

    res.json({ success: true, message: 'Review deleted and product rating updated.' });
  } catch (err) {
    console.error('Review deletion error:', err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// PATCH /api/reviews/:id/testimonial
router.patch('/:id/testimonial', authenticateUser,isAdmin, async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { isTestimonial: true }, { new: true });
  res.json(review);
});









module.exports = router;