import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';

const PrivateRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("check ", token);
  return token ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
