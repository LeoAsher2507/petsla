import React from 'react';
import PageWrap from 'src/components/PageWrap';
import HomeBanner from 'src/layouts/HomeBanner';
import './HomePage.scss';

const HomePage = () => {
  return (
    <PageWrap className='home-page'>
      <HomeBanner />
    </PageWrap>
  );
};

export default HomePage;
