import React, { useEffect, useState } from 'react';
// import './CounterSection.css'; // Optional for custom styles
import bgImage from '../../assets/images/bg_8.jpg'; // Adjust path as needed

const countersData = [
  { label: 'Happy Customers', target: 10000 },
  { label: 'Branches', target: 100 },
  { label: 'Partner', target: 1000 },
  { label: 'Awards', target: 100 },
];

const CounterSection = () => {
  const [counts, setCounts] = useState(countersData.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev =>
        prev.map((count, i) =>
          count < countersData[i].target
            ? Math.min(count + Math.ceil(countersData[i].target / 100), countersData[i].target)
            : count
        )
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="section-counter"
      className="py-5 text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="row justify-content-center py-5">
          <div className="col-md-10">
            <div className="row text-center">
              {countersData.map((item, index) => (
                <div key={index} className="col-md-3 d-flex justify-content-center mb-4">
                  <div className="block-18">
                    <div className="text">
                      <strong className="number display-6">{counts[index]}</strong>
                      <div>{item.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;