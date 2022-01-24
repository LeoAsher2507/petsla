import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginModal from 'src/components/modals/LoginModal';
import { RootState } from 'src/stores/rootReducer';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';

const PrivateRoute = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCloseAuthModal = () => {
    navigate(-1);
    setShowAuthModal(false);
  };

  useEffect(() => {
    if (!token) {
      setShowAuthModal(true);
      toast.warn('You have to login first!');
    }
  }, [token]);

  return (
    <>
      {token && <Outlet />}

      <LoginModal
        show={showAuthModal}
        handleClose={handleCloseAuthModal}></LoginModal>
    </>
  );
};

export default PrivateRoute;
