import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ERouterPath } from 'src/types/route';
import Media from 'src/utils/Media';
import './HomeBanner.scss';

const HomeBanner = () => {
  return (
    <div className='home-banner'>
      <Carousel>
        <Carousel.Item>
          <Link to={ERouterPath.SHOP}>
            <img srcSet={Media.bannerImg.banner1} alt='' />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={ERouterPath.SHOP}>
            <img srcSet={Media.bannerImg.banner2} alt='' />
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeBanner;
