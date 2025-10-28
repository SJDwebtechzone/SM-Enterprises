import React, { useState } from 'react';
import LocationMap from './LocationMap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';
import '../../assets/css/css/ContactSection.css'// Optional for custom styles
import FreeMap from './FreeMap';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      alert(result.message || 'Message sent!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    

<section className="py-5" style={{ backgroundColor: '#f9f4f2ff' }}>
  <div className="container">
    {/* Contact Info */}
    <div className="row text-center mb-5 ">
      {[{
        icon: <FaMapMarkerAlt />,
        label: 'Address',
        value: '198 West 21th Street, Suite 721 New York NY 10016'
      }, {
        icon: <FaPhoneAlt />,
        label: 'Phone',
        value: <a href="tel:+1235235598">+91 9788661093</a>
      }, {
        icon: <FaEnvelope />,
        label: 'Email',
        value: <a href="mailto:info@yoursite.com">smvilakku@gmail.com</a>
      // }, {
      //   icon: <FaGlobe />,
      //   label: 'Website',
      //   value: <a href="#">yoursite.com</a>
      // 
      }].map((item, idx) => (
        <div className="col-md-4 mb-4" key={idx}>
          <div className="bg-white p-4 shadow-sm rounded h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="contact-icon" style={{ fontSize: '1.5rem', color: '#007bff' }}>{item.icon}</div>
            <p className="mt-3 mb-1"><strong>{item.label}:</strong></p>
            <p className="mb-0">{item.value}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Contact Form & Map */}
    <div className="row">
      {/* Contact Form */}
      <div className="col-md-6 order-md-last mb-4">
        <form className="bg-white p-4 shadow-sm rounded" onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center">Send Us a Message</h4>
      <div className="mb-3">
        <input
          type="text"
          name="name"
          className="form-control rounded-pill"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          className="form-control rounded-pill"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="subject"
          className="form-control rounded-pill"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <textarea
          name="message"
          className="form-control rounded"
          rows="5"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn px-4 py-2 rounded-pill"
          style={{ backgroundColor: '#0c1354ff', color: '#fff' }}
        >
          Send Message
        </button>
      </div>
    </form>
  

      </div>

      {/* Map */}
      <div className="col-md-6 mb-4">
        <div className="bg-white p-4 shadow-sm rounded overflow-hidden" style={{ height: '100%' }}>
          <FreeMap />
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default ContactSection;