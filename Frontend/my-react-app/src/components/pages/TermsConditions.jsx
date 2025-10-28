//terms and conditions// src/components/TermsConditions.jsx
import React, { useState } from 'react';
import '../../assets/css/css/termandconditions.css';
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

const TermsConditions = () => {
  return (
    <main className="sp-wrapper" role="main">
      <header className="sp-header">
        <h1 className="sp-title">Terms & Conditions</h1>
        <p className="sp-subtitle">
          By accessing or using our website, you agree to comply with and be bound by the following terms. Please read them carefully before making any purchase.
        </p>
      </header>

      <div className="sp-card">
        <Section title="General" defaultOpen={true}>
          <ul className="sp-list">
            <li>These Terms & Conditions govern your use of our website and services.</li>
            <li>We may update or modify these terms at any time without prior notice.</li>
            <li>Continued use of the site after changes means you accept the updated terms.</li>
          </ul>
        </Section>

        <Section title="Eligibility" defaultOpen={true}>
          <ul className="sp-list">
            <li>You must be at least 18 years old to place an order.</li>
            <li>If under 18, you may use the site only with the involvement of a parent or guardian.</li>
          </ul>
        </Section>

        <Section title="Products & Pricing" defaultOpen={true}>
          <ul className="sp-list">
            <li>We strive to display product details, images, and prices accurately.</li>
            <li>Prices are subject to change without notice.</li>
            <li>All prices are in Indian Rupees (₹) and inclusive of applicable taxes unless stated otherwise.</li>
          </ul>
        </Section>

        <Section title="Orders" defaultOpen={true}>
          <ul className="sp-list">
            <li>Placing an order constitutes an offer to purchase the product(s).</li>
            <li>We reserve the right to accept or reject any order at our discretion.</li>
            <li>Orders may be cancelled if the product is unavailable, there is a pricing error, or payment is not received.</li>
          </ul>
        </Section>

        <Section title="Payments" defaultOpen={false}>
          <ul className="sp-list">
            <li>We accept payments via [list payment methods: UPI, credit/debit cards, net banking, etc.].</li>
            <li>For Cash on Delivery (COD) orders, payment must be made in full at the time of delivery.</li>
          </ul>
        </Section>

        <Section title="Shipping" defaultOpen={false}>
          <ul className="sp-list">
            <li>Shipping timelines and charges are outlined in our <a href="/shipping-policy">Shipping Policy</a>.</li>
            <li>We are not responsible for delays caused by courier services or unforeseen events.</li>
          </ul>
        </Section>

        <Section title="Returns & Refunds" defaultOpen={false}>
          <ul className="sp-list">
            <li>Our <a href="/returns-refunds">Returns & Refunds Policy</a> explains the process and eligibility for returns.</li>
            <li>Refunds will be processed as per the terms stated in that policy.</li>
          </ul>
        </Section>

        <Section title="Intellectual Property" defaultOpen={false}>
          <ul className="sp-list">
            <li>All content on this site is the property of [YourStoreName] or its content suppliers.</li>
            <li>You may not reproduce, distribute, or use any content without prior written permission.</li>
          </ul>
        </Section>

        <Section title="Limitation of Liability" defaultOpen={false}>
          <ul className="sp-list">
            <li>We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</li>
            <li>Our total liability for any claim shall not exceed the amount paid for the product in question.</li>
          </ul>
        </Section>

        <Section title="Governing Law" defaultOpen={false}>
          <ul className="sp-list">
            <li>These Terms & Conditions are governed by the laws of India.</li>
            <li>Any disputes will be subject to the exclusive jurisdiction of the courts in Tiruvannamalai,TamilNadu.</li>
          </ul>
        </Section>

        <Section title="Contact Us" defaultOpen={false}>
          <ul className="sp-list">
            <li>📞 +91 9788661093 (10:00 AM – 6:00 PM IST, Mon–Sat)</li>
            <li>📧 smvilakku@gmail.com</li>
          </ul>
        </Section>
      </div>
    </main>
  );
};

export default TermsConditions;