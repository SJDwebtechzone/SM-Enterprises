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
      .then(res => {
        // Check if response is ok and content-type is JSON
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
        // Ensure data is an array
        if (Array.isArray(data)) {
          setPromos(data);
        } else {
          console.error('Invalid promos data format:', data);
          setPromos([]);
        }
      })
      .catch(err => {
        console.error('Error fetching promos:', err);
        setPromos([]); // Set empty array to prevent crashes
      });
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
          {promos && promos.length > 0 ? (
            promos.map((promo, index) => (
              <span key={index}>
                {promo.message} &nbsp;&nbsp;&nbsp;
              </span>
            ))
          ) : (
            <span>🚚 Free Shipping on All Orders Over ₹999! &nbsp;&nbsp;&nbsp; 🎉 Buy 1 Get 1 Free on Select Items! &nbsp;&nbsp;&nbsp; 💥 Limited Time Offer: Flat 20% Off!</span>
          )}
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