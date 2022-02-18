import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ERouterPath } from 'src/types/route';
import Media from 'src/utils/Media';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(ERouterPath.HOME);
  };
  return (
    <div className='not-found-page'>
      <img src={Media.notFound} alt='404 Not Found' />

      <h5 className='not-found-title '>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable!
      </h5>

      <Button
        className='custom-btn back-to-home-btn'
        onClick={handleBackToHome}>
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
