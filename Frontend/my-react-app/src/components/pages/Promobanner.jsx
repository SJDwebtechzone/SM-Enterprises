// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const PromoBanner = () => {
//   return (
//     <div className="bg-white text-dark py-2 border-bottom overflow-hidden">
//       <div className="container-fluid">
//         <div
//           className="d-inline-block text-dark"
//           style={{
//             whiteSpace: 'nowrap',
//             animation: 'scrollText 15s linear infinite',
//             fontWeight: '600',
//             fontFamily: 'Poppins, sans-serif',
//             fontSize: '1rem',
//             color:'black'

//           }}
//         >
//           🚚 Free Shipping on All Orders Over ₹999! &nbsp;&nbsp;&nbsp; 🎉 Buy 1 Get 1 Free on Select Items! &nbsp;&nbsp;&nbsp; 💥 Limited Time Offer: Flat 20% Off!
//         </div>
//       </div>

//       {/* Inline CSS for animation */}
//       <style>
//         {`
//           @keyframes scrollText {
//             0% { transform: translateX(100%); }
//             100% { transform: translateX(-100%); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default PromoBanner;
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PromoBanner = () => {
  const [promos, setPromos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/promos`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setPromos(data);
        } else {
          console.error('Invalid promos data format:', data);
          setPromos([]);
        }
      })
      .catch(err => {
        console.error('Error fetching promos:', err);
        setPromos([]);
      });
  }, []);

  // Auto-advance promos every 5 seconds if there are multiple
  useEffect(() => {
    if (promos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promos]);

  const prevPromo = () => {
    const len = promos.length > 0 ? promos.length : 1;
    setCurrentIndex(prev => (prev === 0 ? len - 1 : prev - 1));
  };

  const nextPromo = () => {
    const len = promos.length > 0 ? promos.length : 1;
    setCurrentIndex(prev => (prev + 1) % len);
  };

  const currentMessage = promos.length > 0
    ? promos[currentIndex]?.message
    : "Special Offer! Get 20% off on all Rudraksha malas. Use code: SPIRITUAL20 | Offer valid till 30th June 2024.";

  return (
    <div className="container py-2" style={{ background: 'transparent' }}>
      <style>
        {`
          @keyframes promoScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
      <div 
        className="d-flex align-items-center mx-auto shadow-sm"
        style={{
          maxWidth: '1100px',
          background: '#fffbf4',
          border: '1.5px solid #d4af37',
          borderRadius: '30px',
          padding: '8px 24px',
          color: '#4a2800',
          fontSize: '0.9rem',
          fontWeight: '600',
          overflow: 'hidden'
        }}
      >
        {/* Full Bar: Scrolling Promo Text */}
        <div className="d-flex align-items-center w-100" style={{ overflow: 'hidden' }}>
          <div style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '22px' }}>
            <div
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                paddingLeft: '100%',
                animation: 'promoScroll 30s linear infinite'
              }}
            >
              {currentMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;