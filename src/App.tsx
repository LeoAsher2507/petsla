import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'src/components/Navigation/PrivateRoute';
import AccountPage from 'src/pages/AccountPage';
import CartPage from 'src/pages/CartPage';
import PaymentPage from 'src/pages/PaymentPage';
import ReviewPage from 'src/pages/ReviewPage';
import CustomerInFoPage from 'src/pages/CustomerInFoPage';
import DetailProductPage from 'src/pages/DetailProductPage';
import LoginPage from 'src/pages/LoginPage';
import ProductsPage from 'src/pages/ProductsPage';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import HomePage from 'src/pages/HomePage';

function App() {
  const style = useAppSelector((state: RootState) => state.themeState.style);

  return (
    <BrowserRouter>
      <div
        className='app'
        style={{ backgroundColor: style.backgroundColor, color: style.color }}>
        <Routes>
          <Route path={ERouterPath.LOGIN} element={<LoginPage />} />

          <Route path={ERouterPath.ACCOUNT} element={<PrivateRoute />}>
            <Route path={ERouterPath.ACCOUNT} element={<AccountPage />} />
          </Route>

          <Route path={ERouterPath.PRODUCT_LIST} element={<ProductsPage />} />
          <Route path={ERouterPath.HOME} element={<HomePage />} />
          <Route path={ERouterPath.CART} element={<CartPage />} />
          <Route
            path={ERouterPath.CUSTOMER_INFO}
            element={<CustomerInFoPage />}
          />
          <Route path={ERouterPath.PAYMENT} element={<PaymentPage />} />
          <Route path={ERouterPath.REVIEW} element={<ReviewPage />} />
          <Route
            path={`${ERouterPath.DETAIL_PRODUCT}-:id`}
            element={<DetailProductPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
