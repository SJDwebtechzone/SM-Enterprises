const express = require('express');

const Order = require('../models/Order');
const Product = require('../models/ProductCollection');
const router = express.Router();

// 🔥 Best-Selling Products
router.get('/bestsellers', async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          totalSold: { $sum: '$items.quantity' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'productcollections',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          _id: 0,
          productId: '$_id',
          name: '$product.name',
          image: '$product.image',
          price: '$product.price',
          sale: '$product.sale',
          stock: '$product.stock',
          totalSold: 1
        }
      }
    ]);

    res.json(topProducts);
  } catch (err) {
    console.error('Bestseller fetch error:', err);
    res.status(500).send('Failed to fetch bestsellers');
  }
});


// ⚠️ Low Stock Alerts
router.get('/lowstock', async (req, res) => {
  try {
    const threshold = 5;
    const lowStock = await Product.find({ stock: { $lt: threshold } });
    res.json(lowStock);
  } catch (err) {
    res.status(500).send('Failed to fetch low stock items');
  }
});

module.exports = router;