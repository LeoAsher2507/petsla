import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from 'src/components/Loading';
import PageWrap from 'src/components/Navigation/PageWrap';
import PrivateRoute from 'src/components/Navigation/PrivateRoute';
import AllModal from 'src/layouts/modals';
import AccountPage from 'src/pages/accountPage';
import OrdersPages from 'src/pages/accountPage/OrdersPages';
import ProfilePage from 'src/pages/accountPage/ProfilePage';
import WishlistPage from 'src/pages/accountPage/WishlistPage';
import CustomerInFoPage from 'src/pages/checkoutStepPages/CustomerInFoPage';
import PaymentPage from 'src/pages/checkoutStepPages/PaymentPage';
import ReviewPage from 'src/pages/checkoutStepPages/ReviewPage';
import DetailOrderPage from 'src/pages/detailPages/DetailOrderPage';
import DetailProductPage from 'src/pages/detailPages/DetailProductPage';
import CartPage from 'src/pages/navigationPages/CartPage';
import ContactPage from 'src/pages/navigationPages/ContactPage';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';

const ProductsPage = lazy(
  () => import('src/pages/navigationPages/ProductsPage')
);
const HomePage = lazy(() => import('src/pages/navigationPages/HomePage'));

function App() {
  const style = useAppSelector((state: RootState) => state.themeState.style);
  // const { currentUser } = useAppSelector((state: RootState) => state.userState);

  return (
    <BrowserRouter>
      <div
        className='app'
        style={{ backgroundColor: style.backgroundColor1, color: style.color }}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='' element={<PageWrap />}>
              <Route path={ERouterPath.ACCOUNT} element={<PrivateRoute />}>
                {/* personal page:   */}
                <Route path='' element={<AccountPage />}>
                  <Route path={ERouterPath.PROFILE} element={<ProfilePage />} />
                  <Route
                    path={ERouterPath.WISH_LIST}
                    element={<WishlistPage />}
                  />
                  <Route
                    path={ERouterPath.ORDERS}
                    element={<OrdersPages />}></Route>
                  <Route
                    path={`${ERouterPath.ORDERS}/:id`}
                    element={<DetailOrderPage />}
                  />
                </Route>
              </Route>

              {/* checkout steps pages  */}
              <Route path={ERouterPath.PAYMENT} element={<PaymentPage />} />
              <Route path={ERouterPath.REVIEW} element={<ReviewPage />} />

              {/* detail pages  */}
              <Route
                path={`${ERouterPath.DETAIL_PRODUCT}-:id`}
                element={<DetailProductPage />}
              />

              {/* navigation Page */}
              <Route path={ERouterPath.SHOP} element={<ProductsPage />} />
              <Route path={ERouterPath.CART} element={<CartPage />} />
              <Route path={ERouterPath.CONTACT} element={<ContactPage />} />
              <Route
                path={ERouterPath.CUSTOMER_INFO}
                element={<CustomerInFoPage />}
              />
              <Route path={ERouterPath.HOME} element={<HomePage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      <AllModal />
    </BrowserRouter>
  );
}

export default App;
