import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const CheckoutSection = ({subtotal,discount,delivery,total,cartItems,cart,setCart,setCartClickCount}) => {
  const handleCheckout = () => {
    // Your checkout logic here
    setCart([]);
    setCartClickCount(0); // Reset click count
  };
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          {/* Billing Form */}
          <div className="col-xl-7">
            <form className="bg-white p-4 shadow-sm">
              <h3 className="mb-4">Billing Details</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-md-12">
                  <label className="form-label">State / Country</label>
                  <select className="form-select">
                    <option>France</option>
                    <option>Italy</option>
                    <option>Philippines</option>
                    <option>South Korea</option>
                    <option>Hongkong</option>
                    <option>Japan</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="House number and street name"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mt-4"
                    placeholder="Apartment, suite, unit etc. (optional)"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Town / City</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Postcode / ZIP *</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="" />
                </div>
                <div className="col-md-12 mt-3">
                  <div className="form-check form-check-inline">
                    <input type="radio" name="accountOption" className="form-check-input" />
                    <label className="form-check-label">Create an Account?</label>
                  </div>
                  <div className="form-check form-check-inline ms-3">
                    <input type="radio" name="accountOption" className="form-check-input" />
                    <label className="form-check-label">Ship to different address</label>
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
                <div className="bg-white p-4 shadow-sm">
                  <h3 className="mb-4">Cart Total</h3>
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Delivery</span>
                    <span>₹{delivery?.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Discount</span>
                    <span>₹{discount?.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>₹{total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="col-md-12">
                <div className="bg-white p-4 shadow-sm">
                  <h3 className="mb-4">Payment Method</h3>
                  <div className="form-check mb-2">
                    <input type="radio" name="paymentMethod" className="form-check-input" />
                    <label className="form-check-label ms-2" style={{alignItems:'normal'}}>Direct Bank Transfer</label>
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
                  <Link to="#" onClick={handleCheckout} className="btn btn-primary w-100 py-3">
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