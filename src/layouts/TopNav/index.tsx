import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomLink from 'src/components/customComp/CustomLink';
import ConfirmModal from 'src/components/modals/ConfirmModal';
import LoginModal from 'src/components/modals/LoginModal';
import { logoutMethod } from 'src/services/auth/authSlice';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import { toggleTheme } from 'src/utils/theme/ThemeSlice';
import './TopNav.scss';

const TopNav = () => {
  // theme context

  const { theme, auth } = useAppSelector((state: RootState) => state);
  const { style, isLightTheme } = theme;
  const { token } = auth;

  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const dispatch = useAppDispatch();

  const handleToggleThemeClick = () => {
    dispatch(toggleTheme());
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const handleLogoutClick = () => {
    setShowConfirmLogout(true);
  };

  const handleCloseConfirmLogout = () => {
    setShowConfirmLogout(false);
  };

  const handleLogout = () => {
    handleCloseConfirmLogout();
    dispatch(logoutMethod());
  };

  return (
    <div className='top-nav' style={{ backgroundColor: style.backgroundColor }}>
      <Container>
        <div className='top-nav__branch'>
          <CustomLink to={ERouterPath.HOME}>
            <img src={Media.fullLogo} alt='' />
          </CustomLink>
        </div>

        <ul className='top-nav__list d-none d-lg-flex'>
          <li className='top-nav-item'>
            <CustomLink to={ERouterPath.HOME}>Home</CustomLink>
          </li>

          <li className='top-nav-item'>
            <CustomLink to={ERouterPath.PRODUCT_LIST}>
              <span>Sản phẩm</span>
              <i className='bi bi-chevron-down'></i>
            </CustomLink>

            <ul
              className='top-nav-product-list'
              style={{ backgroundColor: style.backgroundColor }}>
              {/* {category.map((cateItem) => (
                <li key={cateItem.id} className="top-nav-product-item">
                  <CustomLink to={`/products-list-${cateItem.id}`}>
                    {cateItem.category_name}
                  </CustomLink>
                </li>
              ))} */}
              <li className='top-nav-product-item'>
                <CustomLink
                  style={{ background: style.primaryColor, color: '#fff' }}
                  to={ERouterPath.PRODUCT_LIST}>
                  Tất cả
                </CustomLink>
              </li>
            </ul>
          </li>

          <li className='top-nav-item'>
            <CustomLink to={ERouterPath.ACCOUNT}>Tài khoản</CustomLink>
          </li>

          <li className='top-nav-item'>
            <CustomLink to={ERouterPath.CART}>Cart</CustomLink>
          </li>
        </ul>

        <div className='top-nav-btn-wrap'>
          <div
            className='top-nav__theme top-nav-item d-none d-lg-block'
            onClick={() => handleToggleThemeClick()}>
            {isLightTheme ? (
              <i className='bi bi-moon'></i>
            ) : (
              <i className='bi bi-brightness-high-fill'></i>
            )}
            <div
              className='top-nav-item__title'
              style={{
                backgroundColor: style.colorBlur,
                color: style.backgroundColor,
              }}>
              Toggle Theme
            </div>
          </div>

          <div className='auth-btn__wrap top-nav-item'>
            {token ? (
              <>
                <i
                  onClick={handleLogoutClick}
                  className='bi bi-box-arrow-right'></i>
                <div
                  className='top-nav-item__title'
                  style={{
                    backgroundColor: style.colorBlur,
                    color: style.backgroundColor,
                  }}>
                  Đăng xuất
                </div>
              </>
            ) : (
              <>
                <i
                  onClick={handleLoginClick}
                  className='bi bi-box-arrow-in-left'></i>
                <div
                  className='top-nav-item__title'
                  style={{
                    backgroundColor: style.colorBlur,
                    color: style.backgroundColor,
                  }}>
                  Đăng nhập
                </div>
              </>
            )}
          </div>

          <div className='top-nav__cart top-nav-item'>
            <input
              type='checkbox'
              name='top-nav-cart-checkbox'
              id='top-nav-cart-checkbox'
              hidden
            />
            <label
              htmlFor='top-nav-cart-checkbox'
              className='top-nav__cart-icon'>
              <div className='top-nav-cart-icon'>
                <i className='bi bi-cart3'></i>
                <div
                  className='top-nav-item__title'
                  style={{
                    backgroundColor: style.colorBlur,
                    color: style.backgroundColor,
                  }}>
                  Cart
                </div>
                <span style={{ border: `2px solid ${style.backgroundColor}` }}>
                  {/* {totalInCart().totalProduct} */}99
                </span>
              </div>
              <i className='bi bi-x-lg'></i>
            </label>
          </div>
        </div>
      </Container>

      <ConfirmModal
        modalTitle='Confirm Logout'
        modalContent='Are you sure to log out?'
        saveBtnText='Logout'
        show={showConfirmLogout}
        handleClose={handleCloseConfirmLogout}
        handleSave={handleLogout}></ConfirmModal>

      <LoginModal
        show={showAuthModal}
        handleClose={handleCloseAuthModal}></LoginModal>
    </div>
  );
};

export default TopNav;
