import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouScreen = ({ orderDetails }) => {
  console.log('thank you screen', orderDetails);
  const { name, amount, paymentId, items } = orderDetails || {};

  if (!orderDetails || !items) {
    return null; // or a loading spinner
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🙏 Thank You, {name}!</h1>
        <p style={styles.subtitle}>Your blessed purchase has been received with joy.</p>

        <div style={styles.summary}>
          <h3 style={styles.sectionTitle}>🛍️ Order Summary</h3>
          <ul style={styles.itemList}>
            {items.map((item, index) => (
              <li key={index} style={styles.item}>
                {item.name} × {item.quantity} — ₹{item.price}
              </li>
            ))}
          </ul>
          <p style={styles.total}>Total Paid: ₹{amount}</p>
          <p style={styles.paymentId}>Payment ID: {paymentId}</p>
        </div>

        <div style={styles.blessing}>
          <p>🌼 May this item bring peace, joy, and divine grace to your home.</p>
          <p>🪔 We’re preparing your order with love and devotion.</p>
        </div>

        <Link to="/" style={styles.button}>
          Continue Shopping
        </Link>

      </div>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(to bottom right, #fff8e1, #ffe0b2)',
    minHeight: '100vh',
    padding: '40px 0',
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    background: '#fff3e0',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '2.5rem',
    color: '#d4af37',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#5d4037'
  },
  summary: {
    marginBottom: '20px',
    textAlign: 'left'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#8d6e63'
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '10px'
  },
  item: {
    fontSize: '0.95rem',
    marginBottom: '4px'
  },
  total: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '10px'
  },
  paymentId: {
    fontSize: '0.85rem',
    color: '#8d6e63'
  },
  blessing: {
    marginTop: '20px',
    fontSize: '0.95rem',
    color: '#6d4c41'
  },
  button: {
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    border: 'none',
    color: 'white',
    padding: '12px 24px',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    marginTop: '20px'
  }
};

export default ThankYouScreen;