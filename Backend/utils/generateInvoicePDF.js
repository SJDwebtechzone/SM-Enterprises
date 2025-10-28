// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// function generateInvoicePDF(invoice) {
//   const doc = new PDFDocument();
//   const filePath = `./public/invoices/${invoice.orderId}.pdf`;
//   doc.pipe(fs.createWriteStream(filePath));

//   doc.fontSize(20).fillColor('#d4af37').text('🪔 Spiritual Store Invoice', { align: 'center' });
//   doc.moveDown();
//   doc.fontSize(12).fillColor('#333').text(`Invoice ID: ${invoice.orderId}`);
//   doc.text(`Payment ID: ${invoice.paymentId}`);
//   doc.text(`Amount: ₹${invoice.amount}`);
//   doc.text(`Status: ${invoice.status}`);
//   doc.moveDown();
//   doc.text(`Customer: ${invoice.customer.name}`);
//   doc.text(`Email: ${invoice.customer.email}`);
//   doc.text(`Phone: ${invoice.customer.phone}`);
//   doc.text(`Address: ${invoice.customer.address}`);
//   doc.moveDown();
//   doc.text('Thank you for your blessed purchase 🙏', { align: 'center' });

//   doc.end();
// }

// module.exports = generateInvoicePDF;
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// function generateInvoicePDF(invoice) {
//   const folderPath = path.join(__dirname, '../public/invoices');
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true });
//   }

//   const filePath = path.join(folderPath, `${invoice.orderId}.pdf`);
//   const doc = new PDFDocument();
//   doc.pipe(fs.createWriteStream(filePath));

//   // Header
//   doc.fontSize(20).fillColor('#d4af37').text('🪔 Spiritual Store Invoice', { align: 'center' });
//   doc.moveDown();

//   // Invoice Details
//   doc.fontSize(12).fillColor('#333');
//   doc.text(`Invoice ID: ${invoice.orderId}`);
//   doc.text(`Payment ID: ${invoice.paymentId}`);
//   doc.text(`Amount: ₹${invoice.amount}`);
//   doc.text(`Status: ${invoice.status}`);
//   doc.text(`Date: ${new Date().toLocaleDateString()}`);
//   doc.moveDown();

//   // Customer Info
//   doc.text(`Customer: ${invoice.customer.name}`);
//   doc.text(`Email: ${invoice.customer.email}`);
//   doc.text(`Phone: ${invoice.customer.phone}`);
//   doc.text(`Address: ${invoice.customer.address}`);
//   doc.moveDown();

//   // Footer
//   doc.text('Thank you for your blessed purchase 🙏', { align: 'center' });
//   doc.moveDown();
//   doc.fontSize(10).fillColor('#888').text('🪔 Powered by SmEnterprises • www.spiritualstore.in', { align: 'center' });

//   doc.end();
//   return filePath;
// }

// module.exports = generateInvoicePDF;

// utils/generateInvoicePDF.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateInvoicePDF(invoice) {
  //  console.log('pdf',invoice)
  const folderPath = path.join(__dirname, '../public/invoices');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, `${invoice.orderId}.pdf`);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  // Header
  doc.fontSize(20).fillColor('#d4af37').text('🪔 Spiritual Store Invoice', { align: 'center' });
  doc.moveDown();

  // Invoice Details
  doc.fontSize(12).fillColor('#333');
  doc.text(`Invoice ID: ${invoice.orderId}`);
  doc.text(`Payment ID: ${invoice.paymentId}`);
  doc.text(`Amount: ₹${invoice.total}`);
  doc.text(`Status: ${invoice.status}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  // Customer Info
  doc.text(`Customer: ${invoice.customer.name}`);
  doc.text(`Email: ${invoice.customer.email}`);
  doc.text(`Phone: ${invoice.customer.phone}`);
  doc.text(`Address: ${invoice.customer.address}`);
  doc.moveDown();

  // Footer
  doc.text('Thank you for your blessed purchase 🙏', { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).fillColor('#888').text('🪔 Powered by SmEnterprises • www.spiritualstore.in', { align: 'center' });

  doc.end();
  return filePath;
}

module.exports = generateInvoicePDF;