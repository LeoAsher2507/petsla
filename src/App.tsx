import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import HomePage from 'src/pages/HomePage';
import Loading from 'src/components/Loading';
import PrivateRoute from 'src/components/Navigation/PrivateRoute';
import AllModal from 'src/layouts/modals';
import AccountPage from 'src/pages/AccountPage';
import CartPage from 'src/pages/CartPage';
import ContactPage from 'src/pages/ContactPage';
import CustomerInFoPage from 'src/pages/CustomerInFoPage';
import DetailProductPage from 'src/pages/DetailProductPage';
import PaymentPage from 'src/pages/PaymentPage';
import ReviewPage from 'src/pages/ReviewPage';
// import ProductsPage from 'src/pages/ProductsPage';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';

const ProductsPage = lazy(() => import('src/pages/ProductsPage'));
const HomePage = lazy(() => import('src/pages/HomePage'));

function App() {
  const style = useAppSelector((state: RootState) => state.themeState.style);

  return (
    <BrowserRouter>
      <div
        className='app'
        style={{ backgroundColor: style.backgroundColor1, color: style.color }}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* <Route path={ERouterPath.LOGIN} element={<LoginPage />} /> */}

            <Route path={ERouterPath.ACCOUNT} element={<PrivateRoute />}>
              <Route path={ERouterPath.ACCOUNT} element={<AccountPage />} />
            </Route>

            <Route path={ERouterPath.SHOP} element={<ProductsPage />} />

            <Route path={ERouterPath.CART} element={<CartPage />} />
            <Route path={ERouterPath.CONTACT} element={<ContactPage />} />
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
            <Route path={ERouterPath.HOME} element={<HomePage />} />
          </Routes>
        </Suspense>
      </div>
      <AllModal />
    </BrowserRouter>
  );
}

export default App;
