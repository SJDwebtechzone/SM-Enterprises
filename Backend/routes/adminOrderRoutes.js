const express = require('express');
const router = express.Router();
const Order = require('../models/AdminOrder');
const authenticateUser = require('../middleware/authMiddleware');


const generateInvoicePDF = require('../utils/generateInvoicePDF');
// const sendWhatsAppInvoice=require('../utils/sendWhatappConfirmation')
const path = require('path');


router.post('/create',authenticateUser, async (req, res) => {
    console.log('👤 User:', req.user);
  try {
    const order = await Order.create({
      ...req.body,
    userId: req.user._id // ✅ Attach user ID from JWT
});

    // ✅ Generate PDF
    generateInvoicePDF(order);

    // ✅ Assign public URL (served via Express)
    const fileName = `${order.orderId}.pdf`;
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    order.pdfUrl = `${baseUrl}/invoices/${fileName}`;
    await order.save();

    

    res.json({ success: true, orderId: order.orderId, pdfUrl: order.pdfUrl });
  } catch (err) {
    console.error('❌ Order creation failed:', err);
    res.status(500).send('Order creation failed');
  }
});



router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { status });
  res.send('Status updated');
});
// ✅ Get order by orderId for review page
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('❌ Failed to fetch order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;


// ✅ Send WhatsApp confirmation and invoice
    // await sendWhatsAppInvoice({
    //   orderId: order.orderId,
    //   paymentId: order.paymentId,
    //   amount: order.total,
    //   status: order.status,
    //   customer: order.customer,
    //   invoiceUrl: order.pdfUrl
    // }, 'text');

    // await sendWhatsAppInvoice({
    //   orderId: order.orderId,
    //   paymentId: order.paymentId,
    //   amount: order.total,
    //   status: order.status,
    //   customer: order.customer,
    //   invoiceUrl: order.pdfUrl
    // }, 'file');
