import React from 'react';
import { Link } from 'react-router-dom';
import './ChatFooter.css'
import whatsappIcon from '../../assets/images/WhatsApp.svg';


const ChatFooter = () => {
  const phoneNumber = '919788661093'; // Replace with your actual number
  const handleClick = () => {
  const effect = document.querySelector('.cracker-effect');
  if (!effect) return;

  effect.classList.add('burst');
  setTimeout(() => {
    effect.classList.remove('burst');
  }, 1000);
};

  return (
    <div className="whatsapp-wrapper" onClick={handleClick}>
        <Link
            to={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
        >
            <div className="whatsapp-ring">
                <img
                    src={whatsappIcon}
                    alt="WhatsApp"
                    className="whatsapp-icon"
                />
            </div>

       
         </Link>
       <div className="cracker-effect" />

    </div>

  );
};

export default ChatFooter;