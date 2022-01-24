import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'src/components/PrivateRoute';
import PublicRoute from 'src/components/PublicRoute';
import AccountPage from 'src/pages/AccountPage';
import DetailProductPage from 'src/pages/DetailProductPage';
import HomePage from 'src/pages/HomePage';
import LoginPage from 'src/pages/LoginPage';
import ProductsPage from 'src/pages/ProductsPage';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';

function App() {
  const style = useAppSelector((state: RootState) => state.theme.style);

  return (
    <BrowserRouter>
      <div
        className='app'
        style={{ backgroundColor: style.backgroundColor, color: style.color }}>
        <Routes>
          <Route path={ERouterPath.LOGIN} element={<LoginPage />} />

          <Route path={ERouterPath.HOME} element={<PublicRoute />}>
            <Route path={ERouterPath.ACCOUNT} element={<PrivateRoute />}>
              <Route path={ERouterPath.ACCOUNT} element={<AccountPage />} />
            </Route>

            <Route path={ERouterPath.PRODUCT_LIST} element={<ProductsPage />} />
            <Route path={ERouterPath.CART} element={<h3>Cart</h3>} />
            <Route path={ERouterPath.HOME} element={<HomePage />} />
            <Route
              path={`${ERouterPath.DETAIL_PRODUCT}-:id`}
              element={<DetailProductPage />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
