import React from 'react';

const InvoiceSummary = ({ invoice }) => {
  const { invoiceId, date, customer, items, subtotal, gstAmount, shippingEstimate, discount, total, paymentId } = invoice;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>SM-Enterprises</h2>
      </div>

      <div style={styles.content}>
        <div style={styles.infoRow}>
          <span style={styles.label}>Invoice ID:</span>
          <span style={styles.value}>{invoiceId}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>Payment ID:</span>
          <span style={styles.value}>{paymentId || 'N/A'}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>Subtotal:</span>
          <span style={styles.value}>₹{subtotal ?? total}</span>
        </div>
        {gstAmount > 0 && (
          <div style={styles.infoRow}>
            <span style={styles.label}>GST:</span>
            <span style={styles.value}>₹{Number(gstAmount).toFixed(2)}</span>
          </div>
        )}
        {shippingEstimate > 0 && (
          <div style={styles.infoRow}>
            <span style={styles.label}>Shipping:</span>
            <span style={styles.value}>₹{Number(shippingEstimate).toFixed(2)}</span>
          </div>
        )}
        <div style={styles.infoRow}>
          <span style={styles.label}>Amount Paid:</span>
          <span style={styles.value}>₹{total}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>Status:</span>
          <span style={{ ...styles.value, color: '#4caf50', fontWeight: 'bold' }}>Paid</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>Date:</span>
          <span style={styles.value}>{date}</span>
        </div>

        <div style={styles.divider} />

        <div style={styles.customerBox}>
          <p><strong>Customer:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}</p>
        </div>

        <div style={styles.divider} />

        <div style={styles.footer}>
          <p style={styles.blessing}>Thank you for your blessed purchase 🙏</p>
          <p style={styles.poweredBy}>Powered by SmEnterprises</p>
        </div>
      </div>

      <a
        href={invoice.pdfUrl || `${import.meta.env.VITE_BACKEND_URL}/api/orders/download/${invoiceId}`}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.downloadBtn}
      >
        📥 Download PDF Invoice
      </a>
    </div>
  );
};

const styles = {
  card: {
    background: '#fffdf9',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.15)',
    border: '1px solid #ffe0b2',
    overflow: 'hidden',
    maxWidth: '500px',
    margin: '20px auto',
    fontFamily: 'Roboto, sans-serif',
  },
  header: {
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    padding: '15px',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    color: '#fff',
    fontFamily: 'Great Vibes, cursive',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  content: {
    padding: '25px',
    textAlign: 'left',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '0.95rem',
  },
  label: {
    color: '#8d6e63',
    fontWeight: '500',
  },
  value: {
    color: '#5d4037',
  },
  divider: {
    height: '1px',
    background: '#ffe0b2',
    margin: '20px 0',
  },
  customerBox: {
    color: '#5d4037',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
  footer: {
    textAlign: 'center',
    marginTop: '10px',
  },
  blessing: {
    fontSize: '1.1rem',
    color: '#d4af37',
    fontFamily: 'Great Vibes, cursive',
    margin: '0 0 10px 0',
  },
  poweredBy: {
    fontSize: '0.75rem',
    color: '#a1887f',
    margin: 0,
  },
  downloadBtn: {
    display: 'block',
    padding: '15px',
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    textAlign: 'center',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    borderTop: 'none',
  }
};

export default InvoiceSummary;