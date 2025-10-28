const express = require('express');
const crypto = require('crypto');
const Invoice =require('../models/Invoice');
const razorpay = require('../config/razorpay');

const generateInvoicePDF = require('../utils/generateInvoicePDF');
// const sendWhatsAppConfirmation = require('../utils/sendWhatappConfirmation');
const router = express.Router();

const twilio = require('twilio');


// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// 🧾 Format WhatsApp message
function formatInvoiceMessage(invoice) {
  console.log('whatsapp invoice details',invoice)


  // const itemLines = invoice.items
  //   .map(item => `- ${item.name} – ₹${item.price}`)
  //   .join('\n');

  return `🧾 *Invoice Summary*
Invoice No: ${invoice.orderId}
Date: ${new Date().toLocaleDateString('en-IN')}
Customer Name: ${invoice.customer.name}
email:${invoice.customer.email}
phone:${invoice.customer.phone}
address:${invoice.customer.address}
Payment Status:${invoice.status} ✅

// Items:


*Total:* ₹${invoice.amount}
Payment ID: ${invoice.paymentId}

Thank you for your purchase!`;
}

// 📤 Send WhatsApp confirmation
async function sendWhatsAppConfirmation(invoice) {
  try {
    await client.messages.create({
      from: 'whatsapp:+14155238886',
       to: `whatsapp:+91${invoice.customer.phone}`, // e.g., +919876543210
      body: formatInvoiceMessage(invoice),
      // mediaUrl: [`${process.env.BASE_URL}/invoices/${invoice.orderId}.pdf`] // optional
    });
    console.log('WhatsApp invoice sent!');
  } catch (error) {
    console.error('Twilio error:', error.message);
  }
}

// 🚀 Payment verification route
router.post('/', async (req, res) => {
  try {
    const { orderId, paymentId, signature, customer, amount, items } = req.body;
    console.log('->',items)

    const expected = crypto
      .createHmac('sha256', razorpay.key_secret)
      .update(orderId + '|' + paymentId)
      .digest('hex');

    const status = expected === signature ? 'success' : 'failure';

    const invoice = await Invoice.create({
      orderId,
      paymentId,
      amount,
      status,
      customer,
      items,
    });

    if (status === 'success') {
      await generateInvoicePDF(invoice);
      await sendWhatsAppConfirmation(invoice);
    }

    res.json({ status });
  } catch (err) {
    res.status(500).json({ error: 'Payment verification failed', details: err.message });
  }
});

module.exports = router;
// router.post('/', async (req, res) => {
 
//   try {
//     const { orderId, paymentId, signature, customer, amount } = req.body;

//     const expected = crypto
//       .createHmac('sha256', razorpay.key_secret)
//       .update(orderId + '|' + paymentId)
//       .digest('hex');

//     const status = expected === signature ? 'success' : 'failure';

//     const invoice = await Invoice.create({
//       orderId,
//       paymentId,
//       amount,
//       status,
//       customer
//     });

//     if (status === 'success') {
//       generateInvoicePDF(invoice);
//       // sendWhatsAppConfirmation(invoice);
//     }

//     res.json({ status });
//   } catch (err) {
//     res.status(500).json({ error: 'Payment verification failed', details: err.message });
//   }
// });

// module.exports = router;