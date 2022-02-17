import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'src/layouts/Footer';
import TopNav from 'src/layouts/navbars/TopNav';

const PublicRoute = () => {
  return (
    <>
      <TopNav />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoute;
