import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const CheckoutSection = ({ subtotal, gstAmount, shippingEstimate, discount, delivery, total, cartItems, cart, setCart, setCartClickCount }) => {
  const handleCheckout = () => {
    // Your checkout logic here
    setCart([]);
    setCartClickCount(0); // Reset click count
  };
  return (
    <section className="py-5 bg-transparent">
      <div className="container">
        <div className="row justify-content-center">
          {/* Billing Form */}
          <div className="col-xl-7">
            <form className="p-4 shadow-sm rounded border border-warning" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}>
              <h3 className="mb-4" style={{ color: "#713200", fontFamily: "'Cantata One', serif" }}>Billing Details</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input type="text" className="form-control border-warning" placeholder="" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input type="text" className="form-control border-warning" placeholder="" />
                </div>
                <div className="col-md-12">
                  <label className="form-label fw-semibold">State / Country</label>
                  <select className="form-select border-warning">
                    <option>India</option>
                    <option>France</option>
                    <option>Italy</option>
                    <option>Philippines</option>
                    <option>South Korea</option>
                    <option>Hongkong</option>
                    <option>Japan</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Street Address</label>
                  <input
                    type="text"
                    className="form-control border-warning"
                    placeholder="House number and street name"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control border-warning mt-4"
                    placeholder="Apartment, suite, unit etc. (optional)"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Town / City</label>
                  <input type="text" className="form-control border-warning" placeholder="" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Postcode / ZIP *</label>
                  <input type="text" className="form-control border-warning" placeholder="" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone</label>
                  <input type="text" className="form-control border-warning" placeholder="" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input type="email" className="form-control border-warning" placeholder="" />
                </div>
                <div className="col-md-12 mt-3">
                  <div className="form-check form-check-inline">
                    <input type="radio" name="accountOption" className="form-check-input" />
                    <label className="form-check-label fw-semibold">Create an Account?</label>
                  </div>
                  <div className="form-check form-check-inline ms-3">
                    <input type="radio" name="accountOption" className="form-check-input" />
                    <label className="form-check-label fw-semibold">Ship to different address</label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Cart Summary & Payment */}
          <div className="col-xl-5">
            <div className="row mt-5 pt-3">
              {/* Cart Total */}
              <div className="col-md-12 mb-4">
                <div className="p-4 shadow-sm rounded border border-warning" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}>
                  <h3 className="mb-4" style={{ color: "#713200", fontFamily: "'Cantata One', serif" }}>Cart Total</h3>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Product Price</span>
                    <span>₹{subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>GST</span>
                    <span>₹{(gstAmount ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>discount</span>
                    <span>{discount > 0 ? `-₹${discount.toFixed(2)}` : `₹0.00`}</span>
                  </div>
                  <hr style={{ borderColor: '#d4af37' }} />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>₹{total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="col-md-12">
                <div className="p-4 shadow-sm rounded border border-warning" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}>
                  <h3 className="mb-4" style={{ color: "#713200", fontFamily: "'Cantata One', serif" }}>Payment Method</h3>
                  <div className="form-check mb-2">
                    <input type="radio" name="paymentMethod" className="form-check-input" />
                    <label className="form-check-label ms-2" style={{ alignItems: 'normal' }}>Direct Bank Transfer</label>
                  </div>
                  <div className="form-check mb-2">
                    <input type="radio" name="paymentMethod" className="form-check-input" />
                    <label className="form-check-label">Check Payment</label>
                  </div>
                  <div className="form-check mb-2">
                    <input type="radio" name="paymentMethod" className="form-check-input" />
                    <label className="form-check-label ms-0">Paypal</label>
                  </div>
                  <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">
                      I have read and accept the terms and conditions
                    </label>
                  </div>
                  <Link to="#" onClick={handleCheckout} className="btn btn-warning w-100 py-3 text-dark fw-bold">
                    Place an Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;