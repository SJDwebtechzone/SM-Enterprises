const express = require('express');
const router = express.Router();
const Order = require('../models/AdminOrder');
const PageVisit = require('../models/PageVisit');
// routes/metrics.js

router.get('/metrics', async (req, res) => {
  try {
    const now = new Date();

    // 🗓️ Current month range
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // 🗓️ Previous month range
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // 🗓️ Current week range (Sunday to Saturday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
    endOfWeek.setHours(23, 59, 59, 999);

    // ✅ Fetch orders
    const currentOrders = await Order.find({
      status: 'Delivered',
      date: { $gte: currentMonthStart }
    });

    const previousOrders = await Order.find({
      status: 'Delivered',
      date: { $gte: previousMonthStart, $lte: previousMonthEnd }
    });

    const weeklyOrders = await Order.find({
      status: 'Delivered',
      date: { $gte: startOfWeek, $lte: endOfWeek }
    });

    const visitDoc = await PageVisit.findOne({ page: 'home' });

    // ✅ Metrics
    const totalOrders = currentOrders.length;
    const totalRevenue = currentOrders.reduce((sum, order) => sum + order.total, 0);

    const previousOrdersCount = previousOrders.length;
    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.total, 0);

    const pageVisits = visitDoc?.visits || 0;
    const conversionRate = pageVisits > 0 ? ((totalOrders / pageVisits) * 100).toFixed(2) : 0;

    // ✅ Daily revenue array (Sun to Sat)
    const dailyRevenue = Array(7).fill(0);
    weeklyOrders.forEach(order => {
      const dayIndex = new Date(order.date).getDay(); // 0 = Sun, 6 = Sat
      dailyRevenue[dayIndex] += order.total;
    });

    res.json({
      totalOrders,
      totalRevenue,
      previousOrders: previousOrdersCount,
      previousRevenue,
      pageVisits,
      conversionRate,
      dailyRevenue
    });
  } catch (err) {
    console.error('Metrics error:', err);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

module.exports = router;


router.post('/track-visit', async (req, res) => {
  const { page } = req.body;

  try {
    const visit = await PageVisit.findOneAndUpdate(
      { page },
      { $inc: { visits: 1 } },
      { upsert: true, new: true }
    );

    res.json({ visits: visit.visits });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

module.exports = router;