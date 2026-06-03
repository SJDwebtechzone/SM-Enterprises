import React, { useState } from "react";

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PaymentButton = ({ billing, amount, gateway, onPaymentVerified }) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpay = async () => {
    if (gateway !== "razorpay") return;

    // Validate billing details
    if (!billing.name?.trim()) {
      alert("Please enter your Full Name.");
      return;
    }
    if (!billing.email?.trim()) {
      alert("Please enter your Email Address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billing.email.trim())) {
      alert("Please enter a valid Email Address.");
      return;
    }
    if (!billing.phone?.trim()) {
      alert("Please enter your Phone Number.");
      return;
    }
    if (billing.phone.trim().length < 10) {
      alert("Please enter a valid Phone Number (minimum 10 digits).");
      return;
    }
    if (!billing.address?.trim()) {
      alert("Please enter your delivery Address.");
      return;
    }

    setLoading(true);

    try {
      console.log('Sending request to:', `${import.meta.env.VITE_BACKEND_URL}/api/create-order`);
      console.log('Amount:', amount);
      console.log('Razorpay Key:', razorpayKey);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      console.log('Response status:', res.status);
      const order = await res.json();
      console.log("ORDER:", order);

      if (!res.ok || !order?.id) {
        console.error('Invalid response:', order);
        alert(`Order creation failed: ${order.error || order.message || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      if (window.Razorpay) {
        openRazorpay(order);
        setLoading(false);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        openRazorpay(order);
        setLoading(false);
      };
      document.body.appendChild(script);

    } catch (err) {
      console.error("Payment error:", err);
      alert(`Payment initialization failed: ${err.message}`);
      setLoading(false);
    }
  };

  const openRazorpay = (order) => {
    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: "SM Enterprises",
      description: "Blessed Purchase",
      order_id: order.id,
      handler: function (response) {
        if (onPaymentVerified) {
          onPaymentVerified("success", {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          });
        }
      },
      prefill: {
        name: billing.name,
        email: billing.email,
        contact: billing.phone,
      },
      theme: {
        color: "#d4af37",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button style={styles.button} onClick={loadRazorpay} disabled={loading}>
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
};

const styles = {
  button: {
    background: "linear-gradient(to right, #d4af37, #ffcc80)",
    border: "none",
    color: "white",
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease"
  }
};

export default PaymentButton;
