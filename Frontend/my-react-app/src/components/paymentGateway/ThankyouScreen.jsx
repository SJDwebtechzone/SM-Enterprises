import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouScreen = ({ orderDetails }) => {
  const { name, amount, paymentId, items } = orderDetails || {};

  if (!orderDetails || !items) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <span style={styles.divineIcon}>🙏</span>
      </div>

      <h1 style={styles.title}>Thank You, {name}!</h1>
      <p style={styles.subtitle}>Your blessed purchase has been received with joy.</p>

      <div style={styles.blessingBox}>
        <p>🌼 May this purchase bring peace, joy, and divine grace to your home.</p>
        <p>🪔 We are preparing your order with love and devotion.</p>
      </div>

      <Link to="/" style={styles.button}>
        Continue Shopping ✨
      </Link>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px 0',
    textAlign: 'center',
  },
  iconContainer: {
    fontSize: '4rem',
    marginBottom: '10px',
    animation: 'pulse 2s infinite',
  },
  divineIcon: {
    display: 'inline-block',
  },
  title: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '2.8rem',
    color: '#d4af37',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#8d6e63',
    fontStyle: 'italic',
    marginBottom: '30px',
  },
  blessingBox: {
    background: '#fff8e1',
    border: '1px dashed #d4af37',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px',
    color: '#6d4c41',
    lineHeight: '1.6',
    fontSize: '0.95rem',
  },
  button: {
    display: 'inline-block',
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    color: 'white',
    padding: '12px 35px',
    fontSize: '1.1rem',
    borderRadius: '30px',
    textDecoration: 'none',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
    transition: 'transform 0.2s',
  }
};

export default ThankYouScreen;