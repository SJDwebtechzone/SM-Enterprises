import React, { useState } from 'react';
import '../../assets/css/css/privacy.css'; // custom styling
// import Section from '../components/Section'; // assuming Section is reusable
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
const PrivacyPolicy = () => {
  return (
    <main className="sp-wrapper" role="main">
      <header className="sp-header">
        <h1 className="sp-title">Privacy Policy</h1>
        <p className="sp-subtitle">
          At SM Enterprises, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
        </p>
      </header>

      <div className="sp-card">
        <Section title="1. Information We Collect" defaultOpen={true}>
          <ul className="sp-list">
            <li>Personal details (name, email, phone, address)</li>
            <li>Payment information (securely processed)</li>
            <li>Browsing behavior and device info</li>
            <li>Communication history (emails, chats)</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information" defaultOpen={true}>
          <ul className="sp-list">
            <li>To process and deliver orders</li>
            <li>To communicate updates and support</li>
            <li>To improve your shopping experience</li>
            <li>To send offers (only if you opt-in)</li>
          </ul>
        </Section>

        <Section title="3. Sharing Your Information" defaultOpen={true}>
          <p>We do not sell or rent your data. We may share it with:</p>
          <ul className="sp-list">
            <li>Payment processors (e.g., Razorpay, Stripe)</li>
            <li>Shipping partners (e.g., India Post, Delhivery)</li>
            <li>Legal authorities if required</li>
          </ul>
        </Section>

        <Section title="4. Data Security" defaultOpen={false}>
          <p>
            We use industry-standard security practices. All payments are encrypted and handled by secure third-party services.
          </p>
        </Section>

        <Section title="5. Cookies & Tracking" defaultOpen={false}>
          <p>
            We use cookies to enhance your experience. You can disable them in your browser settings.
          </p>
        </Section>

        <Section title="6. Your Rights" defaultOpen={false}>
          <ul className="sp-list">
            <li>Access or update your data</li>
            <li>Request deletion</li>
            <li>Opt out of marketing</li>
          </ul>
        </Section>

        <Section title="7. Changes to This Policy" defaultOpen={false}>
          <p>
            Updates will be posted here with the revised date.
          </p>
        </Section>

        <Section title="8. Contact Us" defaultOpen={false}>
          <ul className="sp-list">
            <li><strong>Email:</strong> smvilakku@gmail.com</li>
            <li><strong>Phone/WhatsApp:</strong> +91 9788661093</li>
          </ul>
        </Section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;