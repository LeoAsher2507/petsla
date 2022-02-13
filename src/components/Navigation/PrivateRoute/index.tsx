import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { openLoginModal } from 'src/services/auth/authSlice';
import { RootState } from 'src/stores/rootReducer';
import {
  useAppDispatch,
  useAppSelector
} from 'src/utils/hook.ts/customReduxHook';

const PrivateRoute = () => {
  const { token } = useAppSelector((state: RootState) => state.authState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(openLoginModal());
      toast.warn('You have to login first!');
    }
  }, [token, dispatch]);

  return <>{token && <Outlet />}</>;
};

export default PrivateRoute;
