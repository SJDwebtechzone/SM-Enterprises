import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpiQrSection = () => {
  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">Scan & Pay via UPI</h3>

      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card p-4 shadow-sm">
            {/* QR Code Image */}
            <img
              src="https://yourcdn.com/qr-code.png" // Replace with your actual QR code image
              alt="UPI QR Code"
              className="img-fluid mb-3"
              style={{ maxWidth: '300px' }}
            />

            {/* UPI App Icons */}
            <div className="d-flex justify-content-center gap-3 mb-3">
              <img src="https://yourcdn.com/gpay.png" alt="GPay" width="40" />
              <img src="https://yourcdn.com/phonepe.png" alt="PhonePe" width="40" />
              <img src="https://yourcdn.com/paytm.png" alt="Paytm" width="40" />
            </div>

            {/* UPI ID Display */}
            <p className="mb-1 text-muted">Or pay to UPI ID:</p>
            <h5 className="fw-bold">yourname@upi</h5>

            {/* Confirmation Button */}
            <button className="btn btn-success mt-3">
              I've Paid ₹999
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpiQrSection;