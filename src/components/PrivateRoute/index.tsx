import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';

const PrivateRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <Outlet /> : <Navigate to={ERouterPath.LOGIN} />;
};

export default PrivateRoute;
