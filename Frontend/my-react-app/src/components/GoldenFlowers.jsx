import React from 'react';
import './GoldenFlowers.css';

const GoldenFlowers = ({ count = 8 }) => {
  const petals = Array.from({ length: count });

  return (
    <div className="flower-blow-container">
      {petals.map((_, index) => {
        // Randomize speed, delay, scale, and positions to make blinking look organic and spread
        const delay = (index * 0.5).toFixed(1) + 's';
        const duration = (2 + Math.random() * 3).toFixed(1) + 's';
        const scale = (0.6 + Math.random() * 0.5).toFixed(2);
        const top = (10 + Math.random() * 75).toFixed(0) + '%';
        const left = (5 + Math.random() * 90).toFixed(0) + '%';

        return (
          <div
            key={index}
            className="flower-petal"
            style={{
              top,
              left,
              animationDelay: delay,
              animationDuration: duration,
              transform: `scale(${scale})`,
            }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              {/* Golden flower shape with 8 petals */}
              <circle cx="12" cy="12" r="3" fill="#ffb700" />
              {/* Petals */}
              <path d="M12 2 C13 5, 11 5, 12 2 Z" fill="#ffd700" stroke="#d4af37" strokeWidth="0.5" />
              <path d="M12 22 C13 19, 11 19, 12 22 Z" fill="#ffd700" stroke="#d4af37" strokeWidth="0.5" />
              <path d="M2 12 C5 13, 5 11, 2 12 Z" fill="#ffd700" stroke="#d4af37" strokeWidth="0.5" />
              <path d="M22 12 C19 13, 19 11, 22 12 Z" fill="#ffd700" stroke="#d4af37" strokeWidth="0.5" />
              <path d="M4.93 4.93 C7.05 7.05, 5.64 7.76, 4.93 4.93 Z" fill="#ffd700" stroke="#d4af37" strokeWidth="0.5" />
              <path d="M19.07 19.07 C16.95 16.95, 18.36 16.24, 19.07 19.07 Z" fill="#ffd700" stroke="#d4af37" strokeWidth="0.5" />
              <path d="M19.07 4.93 C16.95 7.05, 16.24 5.64, 19.07 4.93 Z" fill="#ffd700" stroke="#d4af37" strokeWidth="0.5" />
              <path d="M4.93 19.07 C7.05 16.95, 7.76 18.36, 4.93 19.07 Z" fill="#ffd700" stroke="#d4af37" strokeWidth="0.5" />
              {/* Additional petal curves for realistic look */}
              <circle cx="12" cy="12" r="1.5" fill="#e65100" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default GoldenFlowers;
