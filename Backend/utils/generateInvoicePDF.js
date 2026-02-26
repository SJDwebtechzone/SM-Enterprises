const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates a themed PDF invoice for a given order.
 * Theme: Blessed/Spiritual (Gold, Cream, Brown)
 */
function generateInvoicePDF(order) {
  const folderPath = path.join(__dirname, '../public/invoices');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, `${order.orderId}.pdf`);
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(fs.createWriteStream(filePath));

  // --- HEADER SECTION ---
  doc.rect(0, 0, 612, 60).fill('#d4af37');

  doc.moveDown(1.5);
  doc.fontSize(22).fillColor('#ffffff').text('SM-ENTERPRISES', 50, 20, { align: 'center', characterSpacing: 1.5 });

  doc.moveDown(4);

  // --- INVOICE INFO ---
  doc.fillColor('#5d4037').fontSize(18).text('INVOICE', { align: 'left' });
  doc.rect(50, doc.y + 2, 80, 2).fill('#d4af37');
  doc.moveDown(1.5);

  const leftColumn = 50;
  const rightColumn = 350;

  doc.fontSize(10).fillColor('#8d6e63');
  doc.text('Invoice ID:', leftColumn);
  doc.fontSize(12).fillColor('#5d4037').text(order.orderId, leftColumn);

  doc.moveUp(2);
  doc.fontSize(10).fillColor('#8d6e63').text('Date:', rightColumn);
  doc.fontSize(12).fillColor('#5d4037').text(new Date().toLocaleDateString('en-IN'), rightColumn);

  doc.moveDown(1);

  doc.fontSize(10).fillColor('#8d6e63').text('Payment ID:', leftColumn);
  doc.fontSize(12).fillColor('#5d4037').text(order.paymentId || 'N/A', leftColumn);

  doc.moveUp(2);
  doc.fontSize(10).fillColor('#8d6e63').text('Status:', rightColumn);
  doc.fontSize(12).fillColor('#d4af37').text(order.status.toUpperCase(), rightColumn);

  doc.moveDown(2);

  // --- CUSTOMER DETAILS ---
  doc.rect(50, doc.y, 512, 0.5).fill('#ffe0b2');
  doc.moveDown(1);

  doc.fontSize(12).fillColor('#d4af37').text('Billed To:', leftColumn);
  doc.moveDown(0.5);
  doc.fontSize(11).fillColor('#5d4037').text(order.customer.name);
  doc.fontSize(10).fillColor('#8d6e63').text(order.customer.email);
  doc.text(order.customer.phone);
  doc.text(order.customer.address, { width: 300 });

  doc.moveDown(2);

  // --- ITEMS TABLE ---
  doc.fillColor('#5d4037').fontSize(12).text('Order Summary');
  doc.moveDown(0.5);

  // Table Header
  const tableTop = doc.y;
  doc.rect(50, tableTop, 512, 20).fill('#fff8e1');
  doc.fillColor('#8d6e63').fontSize(9);
  doc.text('Item Description', 60, tableTop + 6);
  doc.text('Qty', 350, tableTop + 6);
  doc.text('Price', 420, tableTop + 6);
  doc.text('Total', 500, tableTop + 6);

  let currentY = tableTop + 25;

  // Table Rows
  if (order.items && order.items.length > 0) {
    order.items.forEach(item => {
      doc.fillColor('#5d4037').fontSize(10);
      doc.text(item.name, 60, currentY);
      doc.text(item.quantity.toString(), 350, currentY);
      doc.text(`Rs.${item.price}`, 420, currentY);
      doc.text(`Rs.${item.price * item.quantity}`, 500, currentY);

      currentY += 20;
      doc.moveTo(50, currentY - 5).lineTo(562, currentY - 5).strokeColor('#fff8e1').stroke();
    });
  }

  // --- TOTAL SECTION ---
  doc.moveDown(1);
  const totalY = doc.y;
  doc.rect(340, totalY, 222, 30).fill('#fff3e0');
  doc.fillColor('#d4af37').fontSize(14).text(`GRAND TOTAL: Rs.${order.total}`, 350, totalY + 8);

  // --- FOOTER ---
  doc.moveDown(3);
  const footerY = doc.y > 680 ? doc.y : 720; // Ensure it doesn't overlap or go to next page
  doc.rect(50, footerY, 512, 1).fill('#d4af37');
  doc.fontSize(12).fillColor('#d4af37').text('Thank you for your blessed purchase!', 50, footerY + 10, { align: 'center' });

  doc.end();
  return filePath;
}

module.exports = generateInvoicePDF;