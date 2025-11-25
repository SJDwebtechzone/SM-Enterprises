// import React from 'react';

// const PaymentButton = ({ billing, amount, gateway }) => {
//  const loadRazorpay = async () => {
//   if (gateway !== 'razorpay') {
//     alert('Only Razorpay is integrated for now.');
//     return;
//   }

//   // 🔗 Step 1: Create order from backend
//   let order;
//   try {
//     const res = await fetch('http://localhost:5000/create-order', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount })
//     });
//     order = await res.json();
//     console.log('order placement',order)
//   } catch (err) {
//     console.error('Order creation failed:', err);
//     alert('⚠️ Unable to initiate payment. Try again.');
//     return;
//   }

//   // 🧾 Step 2: Load Razorpay script
//   const script = document.createElement('script');
//   script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//   script.async = true;
//   script.onload = () => {
//     const options = {
//       key: 'rzp_test_ABC123',
//       amount: order.amount,
//       currency: 'INR',
//       name: 'Spiritual Store',
//       description: 'Blessed Purchase',
//       image: 'https://yourdomain.com/logo.png',
//       order_id: order.id, // ✅ Pass backend-generated order ID
//       handler: async function (response) {
//         const verifyPayload = {
//           orderId: response.razorpay_order_id,
//           paymentId: response.razorpay_payment_id,
//           signature: response.razorpay_signature,
//           amount,
//           customer: billing
//         };

//         try {
//           const verifyRes = await fetch('http://localhost:5000/verify-payment', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(verifyPayload)
//           });

//           const result = await verifyRes.json();
//           if (result.status === 'success') {
//             alert('🧾 Payment verified and invoice generated!');
//           } else {
//             alert('❌ Payment verification failed.');
//           }
//         } catch (err) {
//           console.error('Verification error:', err);
//           alert('⚠️ Server error during verification.');
//         }
//       },
//       prefill: {
//         name: billing.name,
//         email: billing.email,
//         contact: billing.phone
//       },
//       theme: {
//         color: '#d4af37'
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };
//   document.body.appendChild(script);
// };
//   return (
//     <button style={styles.button} onClick={loadRazorpay}>
//       Pay ₹{amount}
//     </button>
//   );
// };

// const styles = {
//   button: {
//     background: 'linear-gradient(to right, #d4af37, #ffcc80)',
//     border: 'none',
//     color: 'white',
//     padding: '12px 24px',
//     fontSize: '1rem',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//     transition: 'transform 0.2s ease'
//   }
// };

// export default PaymentButton;

import React, { useState } from 'react';
const razorpayKey = import.meta.env?.VITE_RAZORPAY_KEY || 'rzp_test_ABC123'; // for Vite

const PaymentButton = ({ billing, amount, gateway, onPaymentVerified }) => {
  const [loading, setLoading] = useState(false);


  const loadRazorpay = async () => {
    if (gateway !== 'razorpay') {
      alert('Only Razorpay is integrated for now.');
      return;
    }

    setLoading(true);

    // 🔗 Step 1: Create order from backend
    let order;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      order = await res.json();
   
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('⚠️ Unable to initiate payment. Try again.');
      setLoading(false);
      return;
    }

    if (!order || !order.id) {
      alert('⚠️ Invalid order response from server.');
      setLoading(false);
      return;
    }

    // 🧾 Step 2: Load Razorpay script
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => launchRazorpay(order);
      document.body.appendChild(script);
    } else {
      launchRazorpay(order);
    }
  };

  const launchRazorpay = async (order) => {
    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: 'INR',
      name: 'SM Enterprises',
      description: 'Blessed Purchase',
      image: 'https://yourdomain.com/logo.png',
      order_id: order.id,
      handler: async function (response) {
        const verifyPayload = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          amount,
          customer: billing
        };

        try {
          const verifyRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(verifyPayload)
          });

          const result = await verifyRes.json();
          if (result.status === 'success') {
            alert('🧾 Payment verified and invoice generated!');
            if (onPaymentVerified) {
              onPaymentVerified('success', response.razorpay_payment_id);
            }
          } else {
            alert('❌ Payment verification failed.');
          }
        } catch (err) {
          console.error('Verification error:', err);
          alert('⚠️ Server error during verification.');
        }
      },
      prefill: {
        name: billing.name,
        email: billing.email,
        contact: billing.phone
      },
      theme: {
        color: '#d4af37'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <button style={styles.button} onClick={loadRazorpay} disabled={loading}>
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  );
};

const styles = {
  button: {
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    border: 'none',
    color: 'white',
    padding: '12px 24px',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease'
  }
};

export default PaymentButton;
