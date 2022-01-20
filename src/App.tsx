import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'src/components/PrivateRoute';
import PublicRoute from 'src/components/PublicRoute';
import HomePage from 'src/pages/HomePage';
import LoginPage from 'src/pages/LoginPage';
import ProductsPage from 'src/pages/ProductsPage';
import { RootState, useAppSelector } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';

function App() {
  const style = useAppSelector((state: RootState) => state.theme.style);

  return (
    <BrowserRouter>
      <div
        className='app'
        style={{ backgroundColor: style.backgroundColor, color: style.color }}>
        <Routes></Routes>

        <Routes>
          <Route path={ERouterPath.LOGIN} element={<LoginPage />} />

          <Route path={ERouterPath.HOME} element={<PublicRoute />}>
            <Route path={ERouterPath.ACCOUNT} element={<PrivateRoute />}>
              <Route path={ERouterPath.ACCOUNT} element={<h3>Account</h3>} />
            </Route>

            <Route path={ERouterPath.PRODUCT_LIST} element={<ProductsPage />} />
            <Route path={ERouterPath.CART} element={<h3>Cart</h3>} />
            <Route path={ERouterPath.HOME} element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
