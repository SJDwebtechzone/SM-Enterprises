import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthLayout = ({ imageSrc, children }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
  backgroundImage: `linear-gradient(rgba(95, 40, 40, 0.4), rgba(0,0,0,0.4)), url(${imageSrc})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100vh',
}}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // semi-transparent white
          width: '400px',
          
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;