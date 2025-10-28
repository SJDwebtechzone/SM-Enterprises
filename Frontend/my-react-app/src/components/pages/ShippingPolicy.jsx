
import React, { useState } from 'react';
import '../../assets/css/css/shippingpolicy.css';



const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={`sp-section ${open ? 'open' : ''}`}>
      <button
        className="sp-section-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={title.replace(/\s+/g, '-') + '-panel'}
      >
        <h3 className="sp-section-title">{title}</h3>
        <span className="sp-chevron" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>

      <div
        id={title.replace(/\s+/g, '-') + '-panel'}
        className="sp-section-body"
        role="region"
        aria-label={title}
        hidden={!open}
      >
        {children}
      </div>
    </section>
  );
};



const ShippingPolicy = () => {
  return (
    <main className="sp-wrapper" role="main">
      <header className="sp-header">
        <h1 className="sp-title">Shipping Policy</h1>
        <p className="sp-subtitle">
          We’re committed to delivering your order quickly, safely, and in perfect condition.
          For help, call or WhatsApp <a href="tel:+91XXXXXXXXXX" className="sp-link">+91 [9788661093]</a>
          {' '}(10:00 AM – 6:00 PM IST, Mon–Sat).
        </p>
      </header>

      <div className="sp-card">
        <Section title="Order processing time" defaultOpen={true}>
          <ul className="sp-list">
            <li><strong>Cut-off:</strong> Orders placed before 12:00 PM IST (Mon–Sat) are processed and dispatched the same day.</li>
            <li><strong>Next business day:</strong> Orders after 12:00 PM IST dispatch the next business day.</li>
            <li><strong>Weekends/holidays:</strong> Orders placed on Sundays or public holidays process on the next working day.</li>
          </ul>
        </Section>

        <Section title="Domestic shipping (India)" defaultOpen={true}>
          <ul className="sp-list">
            <li><strong>Delivery time:</strong> 3–5 working days depending on location.</li>
            <li><strong>Free shipping:</strong> On prepaid orders above ₹499.</li>
            <li><strong>Shipping fee:</strong> For orders below the threshold, charges are calculated at checkout.</li>
            <li><strong>Couriers:</strong> We ship via trusted partners for safe, timely delivery.</li>
          </ul>
        </Section>

        <Section title="Shipping address accuracy" defaultOpen={true}>
          <ul className="sp-list">
            <li><strong>Correct details:</strong> Ensure your shipping address, PIN code, and contact number are accurate at checkout.</li>
            <li><strong>Responsibility:</strong> Delays, failed deliveries, or extra charges due to incorrect/incomplete addresses are the customer’s responsibility.</li>
            <li><strong>Fixing mistakes:</strong> If you spot an error, contact us immediately before dispatch and we’ll do our best to help.</li>
          </ul>
        </Section>

        <Section title="Order tracking" defaultOpen={true}>
          <ul className="sp-list">
            <li><strong>Tracking link:</strong> You’ll receive SMS/Email with your tracking number once shipped.</li>
            <li><strong>How to track:</strong> Use the tracking number on the courier’s website/app.</li>
          </ul>
        </Section>

        <Section title="Possible delays" defaultOpen={false}>
          <ul className="sp-list">
            <li><strong>Unforeseen events:</strong> Weather, operational issues, or service disruptions can cause delays.</li>
            <li><strong>Support:</strong> If your order is late, reach out — we’ll coordinate with the courier and keep you updated.</li>
          </ul>
        </Section>

        <Section title="Contact us" defaultOpen={false}>
          <ul className="sp-list">
            <li><strong>Phone/WhatsApp:</strong> +91 9788661093 (10:00 AM – 6:00 PM IST, Mon–Sat)</li>
            <li><strong>Email:</strong> smvilakku@gmail.com</li>
          </ul>
        </Section>
      </div>
    </main>
  );
};

export default ShippingPolicy;