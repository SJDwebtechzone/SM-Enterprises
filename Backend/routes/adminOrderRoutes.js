const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Order = require('../models/AdminOrder');
const authenticateUser = require('../middleware/authMiddleware');
const razorpay = require('../config/razorpay');
const generateInvoicePDF = require('../utils/generateInvoicePDF');
const path = require('path');

router.post('/create', authenticateUser, async (req, res) => {
  try {
    const { razorpayOrderId, paymentId, razorpaySignature, status } = req.body;

    // Verify Razorpay signature if provided
    if (razorpaySignature) {
      const secret = process.env.RAZORPAY_KEY_SECRET || razorpay.key_secret;
      const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(razorpayOrderId + "|" + paymentId)
        .digest('hex');

      if (generated_signature !== razorpaySignature) {
        console.error('❌ Invalid Razorpay Signature');
        return res.status(400).json({ error: 'Invalid payment signature' });
      }
      console.log('✅ Payment signature verified');
    }

    // Create the order object
    const order = new Order({
      ...req.body,
      userId: req.user._id,
      status: razorpaySignature ? 'Paid' : (status || 'Pending')
    });

    // Save immediately before potential PDF/WhatsApp failures
    await order.save();
    console.log('✅ Order saved to AdminOrder collection:', order.orderId);

    // Run PDF generation in background (but catch error to not block response)
    generateInvoicePDF(order).then(async () => {
      const fileName = `${order.orderId}.pdf`;
      const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
      order.pdfUrl = `${baseUrl}/invoices/${fileName}`;
      await order.save();
      console.log('📄 PDF generated and linked');
    }).catch(pdfErr => {
      console.error('❌ PDF Generation failed (background):', pdfErr);
    });

    res.json({ success: true, orderId: order.orderId, pdfUrl: order.pdfUrl });
  } catch (err) {
    console.error('❌ Order creation failed:', err);
    res.status(500).json({ error: 'Order storage failed', message: err.message });
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

// ✅ Dedicated route to download/generate PDF
router.get('/download/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).send('Order not found');
    }

    // If PDF URL already exists, redirect to it
    if (order.pdfUrl) {
      return res.redirect(order.pdfUrl);
    }

    // Otherwise, generate it on the fly
    console.log(`📄 PDF missing for ${orderId}, generating now...`);
    const filePath = await generateInvoicePDF(order);
    const fileName = `${orderId}.pdf`;
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    order.pdfUrl = `${baseUrl}/invoices/${fileName}`;
    await order.save();

    res.redirect(order.pdfUrl);
  } catch (err) {
    console.error('❌ PDF on-the-fly generation failed:', err);
    res.status(500).send('Failed to generate PDF');
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
