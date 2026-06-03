
import React, { useState } from 'react';
import PaymentButton from './PaymentButton';
import ThankYouScreen from './ThankyouScreen';
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
  const { subtotal,
    gstAmount,
    shippingEstimate,
    discount,
    total,
    cartItems } = location.state || {};

  const activeCart = (cartItems && cartItems.length > 0) ? cartItems : (cart || []);

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleGatewayChange = (e) => {
    setGateway(e.target.value);
  };

  const createOrder = async (paymentData, invoiceId) => {
    try {
      const orderId = `ORD-${Date.now()}`;
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId,
          invoiceId,
          customer: billing,
          items: activeCart.map(item => ({
            productId: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total,
          paymentId: paymentData.paymentId,
          razorpayOrderId: paymentData.orderId,
          razorpaySignature: paymentData.signature,
          status: 'Paid',
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
    <div style={showThankYou ? styles.pageThankYou : styles.page}>
      {showThankYou ? (
        <div style={styles.thankYouContainer}>
          <div className="row g-4 justify-content-center align-items-stretch">
            {/* Left Column: Thank You Details */}
            <div className="col-12 col-md-6 d-flex">
              <div style={styles.thankYouCard}>
                <ThankYouScreen
                  orderDetails={{
                    name: billing.name,
                    amount: total,
                    paymentId,
                    items: activeCart.map(item => ({
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price
                    }))
                  }}
                />
                <button
                  style={{
                    marginTop: '25px',
                    padding: '12px 28px',
                    background: 'linear-gradient(to right, #ffd54f, #ffcc80)',
                    color: '#5d4037',
                    border: 'none',
                    borderRadius: '25px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => navigate(`/review/${orderId}`)}
                >
                  ✍️ Write a Review
                </button>
              </div>
            </div>

            {/* Right Column: Invoice Summary */}
            <div className="col-12 col-md-6 d-flex">
              <div style={{ width: '100%' }}>
                {invoice && <InvoiceSummary invoice={invoice} />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.card}>
          <h1 style={styles.title}>🪔 Divine Checkout</h1>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Billing Address <span style={{ color: 'red', fontSize: '0.8rem' }}>(All fields required *)</span></h3>
            <input required style={styles.input} name="name" placeholder="Full Name *" value={billing.name} onChange={handleChange} />
            <input required type="email" style={styles.input} name="email" placeholder="Email Address *" value={billing.email} onChange={handleChange} />
            <input required type="tel" style={styles.input} name="phone" placeholder="Phone Number *" value={billing.phone} onChange={handleChange} />
            <textarea required style={styles.textarea} name="address" placeholder="Complete Delivery Address *" value={billing.address} onChange={handleChange} />
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Select Payment Gateway</h3>
            <label style={styles.checkboxLabel}>
              <input type="radio" name="gateway" value="razorpay" checked={gateway === 'razorpay'} onChange={handleGatewayChange} />
              Razorpay (UPI/Card/Netbanking)
            </label>
          </div>

          <PaymentButton
            billing={billing}
            amount={total}
            gateway={gateway}
            onPaymentVerified={async (status, paymentData) => {
              if (status === 'success') {
                try {
                  console.log('📡 Payment successful, notifying backend...');
                  const currentInvoiceId = `INV-${Date.now()}`;
                  const result = await createOrder(paymentData, currentInvoiceId);

                  if (!result.orderId) {
                    alert("Order processed but could not be saved to your account. Please contact support with Payment ID: " + paymentData.paymentId);
                    return;
                  }

                  const { pdfUrl, orderId } = result;

                  await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/clear`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                  });

                  setCart([]);
                  localStorage.removeItem('cart');
                  setCartClickCount(0);
                  setShowThankYou(true);
                  setPaymentId(paymentData.paymentId);
                  setOrderId(orderId);
                  setInvoice({
                    invoiceId: currentInvoiceId,
                    orderId,
                    date: new Date().toLocaleDateString(),
                    paymentMethod: 'Razorpay',
                    customer: billing,
                    items: activeCart.map(item => ({
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price
                    })),
                    subtotal,
                    gstAmount,
                    shippingEstimate,
                    discount,
                    total,
                    paymentId: paymentData.paymentId,
                    pdfUrl
                  });
                } catch (err) {
                  console.error('❌ Checkout flow failed:', err);
                  alert("A technical error occurred while saving your order details. Verification ID: " + paymentData.paymentId);
                }
              }

              setPaymentStatus(status);
            }}
          />

          <p style={styles.footer}>Powered by Razorpay • Secure & Instant</p>
        </div>
      )}
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
  pageThankYou: {
    background: 'linear-gradient(to bottom right, #fff8e1, #ffe0b2)',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Roboto, sans-serif',
    color: '#5d4037',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  thankYouContainer: {
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 15px'
  },
  thankYouCard: {
    background: '#fff3e0',
    padding: '40px 30px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.15)',
    border: '1px solid #ffe0b2',
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
