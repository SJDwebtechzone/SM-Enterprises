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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/promos`)
      .then(res => res.json())
      .then(data => setPromos(data))
      .catch(err => console.error('Error fetching promos:', err));
  }, []);

  return (
    <div className="bg-white text-dark py-2 border-bottom overflow-hidden">
      <div className="container-fluid">
        <div
          className="d-inline-block text-dark"
          style={{
            whiteSpace: 'nowrap',
            animation: 'scrollText 15s linear infinite',
            fontWeight: '600',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1rem',
            color: 'black',
          }}
        >
          {promos.map((promo, index) => (
            <span key={index}>
              {promo.message} &nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default PromoBanner;