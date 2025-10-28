import React from 'react';
import { FaInstagram, FaWhatsapp, FaYoutube, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const SocialIcons = () => {
  return (
    <>
    <li className="list-inline-item">
      <Link   className="list-inline-item text-dark" to="https://www.instagram.com/sm_enterprises555" target="_blank" rel="noopener noreferrer">
        <FaInstagram style={{ fontSize: '2rem', color: '#E1306C' }}/>
      </Link>
      </li>
      <li className="list-inline-item">
      <Link className="list-inline-item text-dark" to="https://wa.me/919500396045" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp style={{ fontSize: '2rem', color: '#25D366' }}/>
      </Link>
      </li>
      <li className="list-inline-item">
      <Link className="list-inline-item text-dark" to="https://www.youtube.com/@SathishSMEnterprises" target="_blank" rel="noopener noreferrer">
        <FaYoutube style={{ fontSize: '2rem', color: '#FF0000' }}/>
      </Link>
      </li>
      <li className="list-inline-item">
      <Link className="list-inline-item text-dark" to="https://www.facebook.com/SathishSMEnterprises/" target="_blank" rel="noopener noreferrer">
        <FaFacebook style={{ fontSize: '2rem', color: '#1877F2' }}/>
      </Link>
      </li>
    </>
  );
};

export default SocialIcons;