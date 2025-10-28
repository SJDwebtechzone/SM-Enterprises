//returns and refundspolicy// src/components/ReturnRefunds.jsx
import React, { useState } from 'react';
import '../../assets/css/css/returnsandrefunds.css';

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


const ReturnsRefunds = () => {
  return (
    <main className="sp-wrapper" role="main">
      <header className="sp-header">
        <h1 className="sp-title">Returns & Refunds Policy</h1>
        <p className="sp-subtitle">
          We want you to be completely satisfied with your purchase. Please read our policy below to understand how returns and refunds work.
        </p>
      </header>

      <div className="sp-card">
        <Section title="Eligibility for returns" defaultOpen={true}>
          <ul className="sp-list">
            <li>Returns accepted only for defective, damaged, or incorrect items.</li>
            <li>Items must be unused, in original packaging, with all tags intact.</li>
            <li>Return request must be made within 7 days of delivery.</li>
            <li>Non‑returnable items include perishable goods, personalized products, and clearance sale items (unless damaged/defective).</li>
          </ul>
        </Section>

        <Section title="How to request a return" defaultOpen={true}>
          <ul className="sp-list">
            <li>Contact us via Call/WhatsApp: +91 9788661093 or Email: [Your Email] within 7 days of delivery.</li>
            <li>Provide your order number, a brief description of the issue, and clear photos of the product and packaging.</li>
            <li>Our team will review your request and confirm if it qualifies for a return.</li>
          </ul>
        </Section>

        <Section title="Return shipping" defaultOpen={true}>
          <ul className="sp-list">
            <li>If the return is due to our error (wrong item, damaged product), we will arrange a free reverse pickup or reimburse your return shipping cost.</li>
            <li>If the return is for any other reason, the customer is responsible for return shipping charges.</li>
          </ul>
        </Section>

        <Section title="Refund process" defaultOpen={true}>
          <ul className="sp-list">
            <li>Once we receive and inspect the returned item, we will notify you of approval or rejection.</li>
            <li>Approved refunds are processed within 5–7 business days to your original payment method.</li>
            <li>For COD orders, refunds will be issued via bank transfer — you will need to provide your account details.</li>
          </ul>
        </Section>

        <Section title="Exchanges" defaultOpen={false}>
          <ul className="sp-list">
            <li>We do not offer direct exchanges. Please place a new order after your refund is processed.</li>
          </ul>
        </Section>

        <Section title="Important notes" defaultOpen={false}>
          <ul className="sp-list">
            <li>Products returned without prior approval will not be accepted.</li>
            <li>We are not responsible for items lost or damaged during return transit if you arrange your own shipping.</li>
            <li>No refunds for products damaged due to misuse, neglect, or improper handling.</li>
          </ul>
        </Section>

        <Section title="Contact us" defaultOpen={false}>
          <ul className="sp-list">
            <li>📞 +91 9788661093 (10:00 AM – 6:00 PM IST, Mon–Sat)</li>
            <li>📧 smvilakku@gmail.com </li>
          </ul>
        </Section>
      </div>
    </main>
  );
};

export default ReturnsRefunds;