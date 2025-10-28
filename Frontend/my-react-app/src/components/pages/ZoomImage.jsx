import React, { useRef, useState } from 'react';
import '../../assets/css/css/productdetailmodel.css';

export const ZoomImage = ({ src, alt }) => {
  const containerRef = useRef(null);
  const lensRef = useRef(null);
  const [showLens, setShowLens] = useState(false);

  const zoomLevel = 2; // You can tweak this

const handleMouseMove = (e) => {
  const container = containerRef.current;
  const lens = lensRef.current;
  const rect = container.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const lensX = x - lens.offsetWidth / 2;
  const lensY = y - lens.offsetHeight / 2;

  lens.style.left = `${lensX}px`;
  lens.style.top = `${lensY}px`;
  lens.style.backgroundPosition = `${-x * zoomLevel + lens.offsetWidth / 2}px ${-y * zoomLevel + lens.offsetHeight / 2}px`;
  lens.style.backgroundSize = `${container.offsetWidth * zoomLevel}px ${container.offsetHeight * zoomLevel}px`;
};

  const handleMouseEnter = () => {
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  return (
    <div
      className="zoom-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={alt} className="img-fluid" />
      <div
        className="zoom-lens"
        ref={lensRef}
        style={{
          display: showLens ? 'block' : 'none',
          backgroundImage: `url(${src})`,
        }}
      />
    </div>
  );
};