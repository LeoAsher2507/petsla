import React from 'react';
import ScrollToTopBtn from 'src/components/Navigation/ScrollToTopBtn';
import CheckoutModal from 'src/layouts/modals/CheckoutModal';
import LoginModal from 'src/layouts/modals/LoginModal';
import RegisterModal from 'src/layouts/modals/RegisterModal';

const AllModal = () => {
  return (
    <>
      <ScrollToTopBtn />
      <LoginModal />
      <RegisterModal />
      <CheckoutModal />
    </>
  );
};

export default AllModal;
