import React, { useState } from 'react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your subscription logic here
  
    setEmail('');
  };

  return (
    <section className="py-5 bg-light">
      <div className="container py-4">
        <div className="row justify-content-center py-5">
          <div className="col-md-6 mb-3 mb-md-0">
            <h2 style={{ fontSize: '22px' }} className="mb-0">
              Subscribe to our Newsletter
            </h2>
            <span>Get e-mail updates about our latest shops and special offers</span>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <form onSubmit={handleSubmit} className="w-100">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary px-3 text-white" style={{backgroundColor:'#0c1354ff', color:'black'}}>
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;