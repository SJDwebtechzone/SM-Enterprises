import React from 'react';

const InvoiceSummary = ({ invoice }) => {
  const { invoiceId, date, customer, items, total, paymentMethod } = invoice;

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🧾 Invoice Summary</h2>
      <p style={styles.meta}>Invoice ID: {invoiceId}</p>
      <p style={styles.meta}>Date: {date}</p>
      <p style={styles.meta}>Payment Method: {paymentMethod}</p>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Customer Details</h3>
        <p>{customer.name}</p>
        <p>{customer.email}</p>
        <p>{customer.phone}</p>
        <p>{customer.address}</p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Items Purchased</h3>
        <ul style={styles.itemList}>
          {items.map((item, index) => (
            <li key={index} style={styles.item}>
              {item.name} × {item.quantity} — ₹{item.price}
            </li>
          ))}
        </ul>
        <p style={styles.total}>Total: ₹{total}</p>
      </div>

      <p style={styles.blessing}>🙏 Thank you for your blessed purchase!</p>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff8e1',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
    fontFamily: 'Roboto, sans-serif',
    maxWidth: '600px',
    margin: 'auto',
    color: '#5d4037'
  },
  title: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '2rem',
    color: '#d4af37',
    marginBottom: '10px',
    textAlign: 'center'
  },
  meta: {
    fontSize: '0.95rem',
    marginBottom: '4px'
  },
  section: {
    marginTop: '20px'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    marginBottom: '10px',
    color: '#8d6e63'
  },
  itemList: {
    listStyle: 'none',
    padding: 0
  },
  item: {
    fontSize: '0.95rem',
    marginBottom: '6px'
  },
  total: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '10px'
  },
  blessing: {
    marginTop: '30px',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#6d4c41'
  }
};

export default InvoiceSummary;