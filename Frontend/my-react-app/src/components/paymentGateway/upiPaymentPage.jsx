import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpiQrSection from './UpiQrSection';

const UpiPaymentPage = () => {
  const [upiId, setUpiId] = useState('');

  const handlePayment = () => {
    if (!upiId) {
      alert('Please enter your UPI ID');
      return;
    }

    // Trigger Razorpay or backend logic here
    alert(`Proceeding with UPI ID: ${upiId}`);
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center">Pay via UPI</h3>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <div className="mb-3">
              <label className="form-label">Enter your UPI ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <small className="text-muted">
                <UpiQrSection/>
                Supported apps: GPay, PhonePe, Paytm, BHIM, Amazon Pay
              </small>
            </div>

            <button className="btn btn-primary w-100" onClick={handlePayment}>
              Pay ₹999 via UPI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpiPaymentPage;