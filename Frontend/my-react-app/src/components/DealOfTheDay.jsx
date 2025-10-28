import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from '../assets/images/bg_6.jpg'; // Adjust path as needed
import '../assets/css/css/DealoftheDay.css'

const DealOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your deal deadline here
  const deadline = new Date('2025-08-25T23:59:59');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = deadline - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <section
      className="py-5 text-white"
      style={{
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  minHeight: '500px',
  width: '100%',
  imageRendering: 'auto',
}}

    >
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-md-6">
            <div className="bg-dark bg-opacity-75 p-4 rounded">
              <span className="text-warning fw-semibold">Best Price For You</span>
              <h2 className="mb-4">Deal of the day</h2>
              <p>
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
              </p>
              <h3>
                <a href="#" className="text-light text-decoration-none">
                  Spinach
                </a>
              </h3>
              <span className="price fs-5">
                $10{' '}
                <a href="#" className="text-warning text-decoration-none fw-bold">
                  now $5 only
                </a>
              </span>

              <div className="d-flex mt-4 gap-3">
                <div className="time text-center">
                  <h4>{timeLeft.days}</h4>
                  <small>Days</small>
                </div>
                <div className="time text-center">
                  <h4>{timeLeft.hours}</h4>
                  <small>Hours</small>
                </div>
                <div className="time text-center">
                  <h4>{timeLeft.minutes}</h4>
                  <small>Minutes</small>
                </div>
                <div className="time text-center">
                  <h4>{timeLeft.seconds}</h4>
                  <small>Seconds</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheDay;