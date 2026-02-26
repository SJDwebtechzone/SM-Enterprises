// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '../assets/css/css/TestimonialCarousel.css';
// import person1 from '../assets/images/person_1.jpg';
// import person2 from '../assets/images/person_2.jpg';
// import person3 from '../assets/images/person_3.jpg';

// const testimonials = [
//   {
//     image: person1,
//     quote: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.',
//     name: 'Garreth Smith',
//     position: 'Marketing Manager',
//   },
//   {
//     image: person2,
//     quote: 'Separated they live in Bookmarksgrove right at the coast of the Semantics.',
//     name: 'Garreth Smith',
//     position: 'Interface Designer',
//   },
//   {
//     image: person3,
//     quote: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
//     name: 'Garreth Smith',
//     position: 'UI Designer',
//   },
//   {
//     image: person1,
//     quote: 'Even the all-powerful Pointing has no control about the blind texts.',
//     name: 'Garreth Smith',
//     position: 'Web Developer',
//   },
//   {
//     image: person1,
//     quote: 'It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
//     name: 'Garreth Smith',
//     position: 'System Analyst',
//   },
//   {
//     image: person1,
//     quote: 'It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
//     name: 'Garreth Smith',
//     position: 'System Analyst',
//   }
// ];

// const TestimonialGrid = () => {
//   const [showAll, setShowAll] = useState(false);

//   const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

//   return (
//     <section
//       className="py-5 bg-light"
//       style={{
//         // backgroundColor: '#ffffff',
//         color: '#ffffff',
//       }}
//     >
//       <div className="container">
//         <div className="text-center mb-5">
//           <span className="text-dark">Testimonial</span>
//           <h2 className="mb-3 text-dark">Our satisfied customer says</h2>
//           <p className="text-dark">
//             Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
//           </p>
//         </div>

//         <div className="row justify-content-center">
//           {displayedTestimonials.map((item, index) => (
//             <div key={index} className="col-md-6 col-lg-4 mb-4">
//               <div className="card h-100 text-center shadow-sm border-0">
//                 <div
//                   className="rounded-circle mx-auto mt-4"
//                   style={{
//                     backgroundImage: `url(${item.image})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     width: '100px',
//                     height: '100px',
//                   }}
//                 ></div>
//                 <div className="card-body">
//                   <p className="fst-italic small text-dark">{item.quote}</p>
//                   <h6 className="mb-0 text-dark">{item.name}</h6>
//                   <span className="text-muted small">{item.position}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-4">
//           <button
//             className="btn btn-dark"
//             onClick={() => setShowAll(!showAll)}
//           >
//             {showAll ? 'Show Less' : 'Show More'}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialGrid;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/css/css/TestimonialCarousel.css';

const TestimonialGrid = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);



  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/testimonials`);
        if (Array.isArray(res.data)) {
          setTestimonials(res.data);
        } else {
          console.error('Invalid testimonials data format:', res.data);
          setTestimonials([]);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        setTestimonials([]);
      }
    };
    fetchTestimonials();
  }, []);

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="d-block mb-2" style={{ color: '#713200', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}>Testimonial</span>
          <h2 className="mb-3">Our satisfied customer says</h2>
        </div>

        <div className="row justify-content-center">
          {displayedTestimonials && displayedTestimonials.length > 0 ? (
            displayedTestimonials.map((item, index) => {
              const rawImage = item.productId?.image || item.image || '';
              const imageUrl = rawImage
                ? (rawImage.startsWith('http') ? rawImage : `${import.meta.env.VITE_BACKEND_URL}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`)
                : 'https://via.placeholder.com/100';

              return (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 text-center shadow-sm border-0">
                    <div
                      className="rounded-circle mx-auto mt-4"
                      style={{
                        backgroundImage: `url('${imageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100px',
                        height: '100px',
                      }}
                    ></div>
                    <div className="card-body">
                      <p className="fst-italic small text-dark">{item.comment}</p>
                      <h6 className="mb-0 text-dark">{item.username}</h6>
                      <span className="text-muted small">{item.productId?.name}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No testimonials available</p>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#8b6914",
              border: "none",
              color: "#fff",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "4px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#8b6914";
              e.target.style.border = "1px solid #8b6914";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#8b6914";
              e.target.style.color = "#fff";
              e.target.style.border = "none";
            }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialGrid;