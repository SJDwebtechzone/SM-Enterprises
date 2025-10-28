import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FAQ = () => {
  const faqs = [
    {
      question: 'What types of products do you sell?',
      answer: 'We specialize in handcrafted items such as brass diyas, pooja accessories, and traditional decor pieces — each crafted with care and cultural significance.'
    },
    {
      question: 'How can I place an order?',
      answer: 'Simply browse our products, add your favorites to the cart, and proceed to checkout. You’ll be guided through a secure payment and shipping process.'
    },
    {
      question: 'Do you offer Cash on Delivery (COD)?',
      answer: 'Currently, we offer prepaid orders only. However, we’re working on enabling COD in select regions soon.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Orders are typically processed within 1–2 business days. Delivery timelines vary by location but usually range from 3–7 working days.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'At the moment, we only ship within India. If you’re outside India and interested in our products, feel free to contact us — we may be able to assist.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes! Once your order is shipped, you’ll receive a tracking link via email or SMS.'
    },
    {
      question: 'What if I entered the wrong address?',
      answer: 'Please contact us immediately at 📧 smvilakku@gmail.com or 📞 +91 9788661093. If the order hasn’t shipped yet, we’ll update the address for you.'
    },
    {
      question: 'Do you accept returns or exchanges?',
      answer: 'We accept returns only for damaged or defective items. Please notify us within 48 hours of delivery with photos, and we’ll guide you through the process.'
    },
    {
      question: 'Are your products handmade?',
      answer: 'Yes! Most of our items are handcrafted by skilled artisans, which means each piece is unique and may have slight variations — a mark of true craftsmanship.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach us via:\n📧 Email: smvilakku@gmail.com\n📞 Phone: +91 9788661093\n💬 WhatsApp: [Add your WhatsApp link if available]'
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                {faq.answer.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;