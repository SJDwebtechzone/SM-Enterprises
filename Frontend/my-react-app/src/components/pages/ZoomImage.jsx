import React, { useRef, useState } from 'react';
import '../../assets/css/css/productdetailmodel.css';

export const ZoomImage = ({ src, alt }) => {
  const containerRef = useRef(null);
  const lensRef = useRef(null);
  const [showLens, setShowLens] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const zoomLevel = 2;

  if (!src) return null;

  const handleMouseMove = (e) => {
    if (isFullscreen) return;
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
    if (isFullscreen) return;
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  return (
    <>
      <div
        className="zoom-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setShowLens(false);
          setIsFullscreen(true);
        }}
        style={{ cursor: 'zoom-in', position: 'relative' }}
      >
        <img src={src} alt={alt} className="img-fluid" style={{ maxHeight: '400px', objectFit: 'contain' }} />
        <div
          className="zoom-lens"
          ref={lensRef}
          style={{
            display: showLens ? 'block' : 'none',
            backgroundImage: `url(${src})`,
          }}
        />
        {/* View instruction overlay */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          fontSize: '11px',
          padding: '2px 8px',
          borderRadius: '12px',
          pointerEvents: 'none',
          zIndex: 5
        }}>
          🔍 Click to view full size
        </div>
      </div>

      {/* Lightbox / Fullscreen view overlay */}
      {isFullscreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {/* Action buttons top right */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px',
            zIndex: 10000
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              style={{
                backgroundColor: '#ffe0b2',
                color: '#8d6e63',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                cursor: 'pointer'
              }}
            >
              Reduce View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                border: 'none',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          </div>
          
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              borderRadius: '8px',
              cursor: 'zoom-out'
            }}
            onClick={() => setIsFullscreen(false)}
          />
        </div>
      )}
    </>
  );
};