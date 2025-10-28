
import React, { useState } from 'react';
import PaymentButton from './PaymentButton';
import ThankYouScreen from './ThankYouScreen';
import InvoiceSummary from './InvoiceSummary';
import { useLocation, useNavigate } from 'react-router-dom';

const BlessedCheckout = ({ cart, setCart, setCartClickCount }) => {
  const [billing, setBilling] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [gateway, setGateway] = useState('razorpay');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [orderId, setOrderId] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const {  subtotal,
        gstAmount,
        shippingEstimate,
        discount,
        total,
        cartItems } = location.state || {};

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleGatewayChange = (e) => {
    setGateway(e.target.value);
  };

  const createOrder = async (paymentId) => {
    try {
      const orderId = `ORD-${Date.now()}`;
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({
          orderId,
          customer: billing,
          items: cart.map(item => ({
            productId: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total,
          paymentId,
          status: 'Pending',
          date: new Date().toISOString()
        })
      });

      const data = await res.json();
      return { pdfUrl: data.pdfUrl || '', orderId };
    } catch (err) {
      console.error('❌ Order creation failed:', err);
      return { pdfUrl: '', orderId: '' };
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🪔 Divine Checkout</h1>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Billing Address</h3>
          <input style={styles.input} name="name" placeholder="Full Name" value={billing.name} onChange={handleChange} />
          <input style={styles.input} name="email" placeholder="Email" value={billing.email} onChange={handleChange} />
          <input style={styles.input} name="phone" placeholder="Phone Number" value={billing.phone} onChange={handleChange} />
          <textarea style={styles.textarea} name="address" placeholder="Address" value={billing.address} onChange={handleChange} />
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Select Payment Gateway</h3>
          <label style={styles.checkboxLabel}>
            <input type="radio" name="gateway" value="razorpay" checked={gateway === 'razorpay'} onChange={handleGatewayChange} />
            Razorpay (UPI/Card/Netbanking)
          </label>
        </div>

        {showThankYou ? (
          <>
            <ThankYouScreen
              orderDetails={{
                name: billing.name,
                amount: total,
                paymentId,
                items: cart.map(item => ({
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price
                }))
              }}
            />
            {invoice && <InvoiceSummary invoice={invoice} />}
            <button
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#ffd54f',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/review/${orderId}`)}
            >
              ✍️ Leave a Review
            </button>
          </>
        ) : (
          <PaymentButton
            billing={billing}
            amount={total}
            gateway={gateway}
            onPaymentVerified={async (status, paymentId) => {
              if (status === 'success') {
                try {
                  const { pdfUrl, orderId } = await createOrder(paymentId);

                  await fetch('/cart/clear', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                  });

                  setCart([]);
                  localStorage.removeItem('cart');
                  setCartClickCount([]);
                  setShowThankYou(true);
                  setPaymentId(paymentId);
                  setOrderId(orderId);
                  setInvoice({
                    invoiceId: `INV-${Date.now()}`,
                    date: new Date().toLocaleDateString(),
                    paymentMethod: 'Razorpay',
                    customer: billing,
                    items: cart.map(item => ({
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price
                    })),
                    total,
                    paymentId,
                    pdfUrl
                  });
                } catch (err) {
                  console.error('❌ Checkout flow failed:', err);
                }
              }

              setPaymentStatus(status);
            }}
          />
        )}

        <p style={styles.footer}>Powered by Razorpay • Secure & Instant</p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(to bottom right, #fff8e1, #ffe0b2)',
    height: '100%',
    minHeight: '100vh',
    padding: '40px 0',
    fontFamily: 'Roboto, sans-serif',
    color: '#5d4037',
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    background: '#fff3e0',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '90%'
  },
  title: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '2.5rem',
    color: '#d4af37',
    marginBottom: '20px'
  },
  section: {
    marginBottom: '20px',
    textAlign: 'left'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#8d6e63'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #d7ccc8',
    fontSize: '1rem'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #d7ccc8',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '60px'
  },
  checkboxLabel: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.95rem'
  },
  footer: {
    marginTop: '20px',
    fontSize: '0.85rem',
    color: '#8d6e63'
  }
};

export default BlessedCheckout;