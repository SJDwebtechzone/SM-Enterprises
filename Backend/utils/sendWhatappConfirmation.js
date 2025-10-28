// const axios = require('axios');

// function sendWhatsAppConfirmation(invoice) {
//   console.log('invoice',invoice)
//   const message = `🪔 Thank you ${invoice.customer.name}!\nYour payment of ₹${invoice.amount} was successful.\nPayment ID: ${invoice.paymentId}\nWe’ve received your blessed offering 🙏`;

//   axios.post('https://api.gupshup.io/sm/api/v1/msg', null, {
//     params: {
//       channel: 'whatsapp',
//       source: 'sandbox', // ✅ required for sandbox
//       destination: `91${invoice.customer.phone}`, // ✅ must be opted-in
//       message,
//       'src.name': 'SmEnterprises'
//     },
//     headers: {
//       'apikey': 'sk_d48feaf1add94296af097b9704b35df6' // ✅ from dashboard
//     }
//   }).then(() => {
//     console.log('✅ WhatsApp message sent');
//   }).catch(err => {
//     console.error('❌ WhatsApp error:', err.response?.data || err.message);
//   });
// }

// module.exports = sendWhatsAppConfirmation;

// const axios = require('axios');

// function sendWhatsAppConfirmation(invoice) {
//   console.log('invoice', invoice);

//   const message = `🪔 Thank you ${invoice.customer.name}!\nYour payment of ₹${invoice.amount} was successful.\nPayment ID: ${invoice.paymentId}\nWe’ve received your blessed offering 🙏`;

//   axios.post('https://api.gupshup.io/sm/api/v1/msg', null, {
//     params: {
//       channel: 'whatsapp',
//       source: 'sandbox', // ✅ required for sandbox
//       destination:` 91${invoice.customer.phone}`, // ✅ must be opted-in
//       message,
//       'src.name': 'SmEnterprises'
//     },
//     headers: {
//       apikey: 'sk_d48feaf1add94296af097b9704b35df6' // ✅ replace with real key
//     }
//   })
//   .then(() => {
//     console.log('✅ WhatsApp message sent');
//   })
//   .catch(err => {
//     console.error('❌ WhatsApp error:', err.response?.data || err.message);
//   });
// }

// module.exports = sendWhatsAppConfirmation;
// const axios = require('axios');

// function sendWhatsAppInvoice(invoice) {
//   console.log('📦 Sending invoice to:', invoice.customer.name);

//   // Construct the media message payload
//   const message = JSON.stringify({
//     type: 'file',
//     url: invoice.invoiceUrl, // Must be a public HTTPS link to the PDF
//     caption:`🧾 Invoice for Order ${invoice.orderId}`
//   });

//   axios.post('https://api.gupshup.io/sm/api/v1/msg', null, {
//     params: {
//       channel: 'whatsapp',
//       source: 'sandbox', // Use 'sandbox' for testing
//       destination:`91${invoice.customer.phone}`, // Must be opted-in
//       message,
//       'src.name': 'SmEnterprises' // Your app name in Gupshup
//     },
//     headers: {
//       apikey: 'sk_d48feaf1add94296af097b9704b35df6' // Replace with your Gupshup API key
//     }
//   })
//   .then(() => {
//     console.log('✅ Invoice sent via WhatsApp');
//   })
//   .catch(err => {
//     console.error('❌ WhatsApp error:', err.response?.data || err.message);
//   });
// }

// module.exports = sendWhatsAppInvoice;
// const axios = require('axios');

// /**
//  * Send a WhatsApp message via Gupshup (text or file)
//  * @param {Object} invoice - Invoice or payment info
//  * @param {string} type - 'text' for confirmation, 'file' for invoice PDF
//  */
// async function sendWhatsAppInvoice(invoice, type = 'text') {
//   console.log('📦 Invoice payload:', invoice);

//   try {
//     let message;

//     if (type === 'text') {
//       message = `🪔 Thank you ${invoice.customer.name}!\nYour payment of ₹${invoice.amount} was successful.\nPayment ID: ${invoice.paymentId}\nWe’ve received your blessed offering 🙏`;
//     } else if (type === 'file') {
//       message = JSON.stringify({
//         type: 'file',
//         url: invoice.invoiceUrl,
//         caption: `🧾 Invoice for Order ${invoice.orderId}`
//       });
//     } else {
//       throw new Error('Invalid message type. Use "text" or "file".');
//     }

//     console.log('📨 WhatsApp message:', message);

//     await axios.post('https://api.gupshup.io/sm/api/v1/msg', null, {
//       params: {
//         channel: 'whatsapp',
//         source: 'sandbox',
//         destination: `91${invoice.customer.phone}`,
//         message,
//         'src.name': 'SmEnterprises'
//       },
//       headers: {
//         apikey: 'sk_d48feaf1add94296af097b9704b35df6' // ✅ Replace with your actual key
//       }
//     });

//     console.log(`✅ WhatsApp ${type === 'text' ? 'confirmation' : 'invoice'} sent to ${invoice.customer.name}`);
//   } catch (err) {
//     console.error('❌ WhatsApp error:', err.response?.data || err.message);
//   }
// }
// +919500396045
// module.exports = sendWhatsAppInvoice;
// Install Twilio SDK first: npm install twilio
const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Send message with invoice
client.messages
  .create({
    from: 'whatsapp:+14155238886',   // Twilio Sandbox Number
    to: 'whatsapp:',    // Customer's WhatsApp number
    body: `🧾 *Invoice Summary*
Invoice No: ORD-1760268796620
Date: 13 October 2025
Customer: John Doe
Payment Status: Paid ✅

Items:
- Product A – ₹1,200
- Product B – ₹800
- Shipping – ₹100

*Total:* ₹2,100
Payment Method: UPI

Thank you for your purchase!`
,
    // mediaUrl: ['https://abc123.ngrok.io/invoices/ORD-1760268796620.pdf']
 // public PDF URL
  })
  .then(message => console.log('Invoice sent! Message SID:', message.sid))
  .catch(error => console.error('Error:', error));



// // Twilio credentials
// const accountSid = '';
// const authToken = '';
// const client = twilio(accountSid, authToken);

// // Send message with invoice
// client.messages
//   .create({
//     from: 'whatsapp:+14155238886',   // Twilio Sandbox Number
//     to: 'whatsapp:+91',    // Customer's WhatsApp number
//     body: '🧾 Here is your invoice. Thank you for your payment!',
//     mediaUrl: ['http://localhost:5000/invoices/ORD-1760268796620.pdf'] // public PDF URL
//   })
//   .then(message => console.log('Invoice sent! Message SID:', message.sid))
//   .catch(error => console.error('Error:', error));