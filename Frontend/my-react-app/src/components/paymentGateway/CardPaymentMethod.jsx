import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardPaymentPage = () => {
  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center">Pay with Credit / Debit Card</h3>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <form>
              <div className="mb-3">
                <label className="form-label">Cardholder Name</label>
                <input type="text" className="form-control" placeholder="John Doe" />
              </div>

              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-control" placeholder="1234 5678 9012 3456" maxLength="19" />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Expiry Date</label>
                  <input type="text" className="form-control" placeholder="MM/YY" maxLength="5" />
                </div>
                <div className="col">
                  <label className="form-label">CVV</label>
                  <input type="password" className="form-control" placeholder="123" maxLength="3" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Billing Email</label>
                <input type="email" className="form-control" placeholder="john@example.com" />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Pay ₹999
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentPage;