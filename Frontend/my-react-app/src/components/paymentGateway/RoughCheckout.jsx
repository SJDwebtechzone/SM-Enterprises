import React, { useState } from 'react';
const razorpayKey = import.meta.env?.VITE_RAZORPAY_KEY;
// const razorpayKey_secret = import.meta.env?.REACT_APP_RAZORPAY_SECRET
const RoughCheckout = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('⚠️ Please enter a valid amount');
      return;
    }
    else
    {
       var options={
       
         key:razorpayKey,
        //  key_secret:razorpayKey_secret,
         amount:amount*100,
         currency:"INR",
         name:"SM Enterprise Project",
         description:"for testing purpose",
         handler:function(response){
            alert(response.razorpay_payment_id);
         },
         prefill:{
            name:"sathish",
            email:"connectwithdevspectra@gmail.com",
            contact:"XXXXXXXXXX"
         },
         notes:{
            address:"Razorpay corporate office"
         },
         theme: {
        color: '#d4af37'
      }

       }
       var pay = new window.Razorpay(options);
    pay.open();
    }

    // setLoading(true);

    // try {
    //   const res = await fetch('http://localhost:5000/create-order', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ amount: numericAmount })
    //   });

    //   const order = await res.json();
    //   console.log('🧾 Order created:', order);
    //   alert(`✅ Order created with ID: ${order.id}`);
    // } catch (err) {
    //   console.error('❌ Order creation failed:', err);
    //   alert('⚠️ Failed to create order. Check server logs.');
    // }

    // setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>🧾 Razorpay Rough Checkout</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSubmit} disabled={loading} style={styles.button}>
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'sans-serif'
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '10px',
    width: '200px'
  },
  button: {
    background: '#d4af37',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '6px'
  }
};

export default RoughCheckout;