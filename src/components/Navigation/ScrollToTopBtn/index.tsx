import React, { useState } from 'react';
import './ScrollToTopBtn.scss';

const ScrollToTopBtn = () => {
  const handleBackToTopClick = () => {
    window.scrollTo(0, 0);
  };

  const [scrollY, setScrollY] = useState(0);

  window.onscroll = () => {
    setScrollY(window.scrollY);
  };

  return (
    <div
      className={`back-to-top-btn ${scrollY > 400 ? 'active' : ''}`}
      onClick={handleBackToTopClick}>
      <i className='fas fa-chevron-up'></i>
    </div>
  );
};

export default ScrollToTopBtn;
