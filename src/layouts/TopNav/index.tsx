import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import StyledLink from 'src/components/customComponents/StyledLink';
import ChangeLangPopOver from 'src/layouts/modals/ChangeLangPopOver';
// import LoginModal from 'src/components/modals/LoginModal';
import TopCart from 'src/layouts/TopCart';
import { logoutMethod, openLoginModal } from 'src/services/auth/authSlice';
import { toggleTheme } from 'src/services/theme/ThemeSlice';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import './TopNav.scss';

const TopNav = () => {
  const { themeState, authState, productState } = useAppSelector(
    (state: RootState) => state
  );

  const { t } = useTranslation();

  const { style, isLightTheme } = themeState;
  const { token } = authState;
  const { totalInCart } = productState;

  // const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleCloseTopCart = () => {
    setShowCart(false);
  };

  const dispatch = useAppDispatch();

  const handleToggleThemeClick = () => {
    dispatch(toggleTheme());
  };

  const handleLoginClick = () => {
    // setShowLoginModal(true);
    dispatch(openLoginModal());
  };

  const handleLogoutClick = () => {
    dispatch(logoutMethod());
  };

  return (
    <div className='top-nav' style={{ backgroundColor: style.backgroundColor }}>
      <Container>
        <div className='top-nav__branch'>
          <StyledLink to={ERouterPath.HOME}>
            <img src={Media.fullLogo} alt='' />
          </StyledLink>
        </div>

        <ul className='top-nav__list d-none d-lg-flex'>
          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.HOME}>
              {' '}
              {t('title.homepage')}{' '}
            </StyledLink>
          </li>

          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.PRODUCT_LIST}>
              <span> {t('title.shop')} </span>
              <i className='bi bi-chevron-down'></i>
            </StyledLink>

            <ul
              className='top-nav-product-list'
              style={{ backgroundColor: style.backgroundColor }}>
              {/* {category.map((cateItem) => (
                <li key={cateItem.id} className="top-nav-product-item">
                  <StyledLink to={`/products-list-${cateItem.id}`}>
                    {cateItem.category_name}
                  </StyledLink>
                </li>
              ))} */}
              <li className='top-nav-product-item'>
                <StyledLink
                  style={{ background: style.primaryColor, color: '#fff' }}
                  to={ERouterPath.PRODUCT_LIST}>
                  Tất cả
                </StyledLink>
              </li>
            </ul>
          </li>

          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.ACCOUNT}>
              {' '}
              {t('title.account')}{' '}
            </StyledLink>
          </li>

          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.CART}> {t('title.cart')} </StyledLink>
          </li>
        </ul>

        <div className='top-nav-btn-wrap'>
          <div className='top-nav-item language-wrap'>
            <ChangeLangPopOver />
          </div>

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
              {t('title.toggleTheme')}
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
                  {t('title.logout')}
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
                  {t('title.login')}
                </div>
              </>
            )}
          </div>

          <div
            className='top-nav__cart top-nav-item'
            onClick={() => setShowCart(true)}>
            <i className='bi bi-cart3'></i>
            <div
              className='top-nav-item__title'
              style={{
                backgroundColor: style.colorBlur,
                color: style.backgroundColor,
              }}>
              {t('title.cart')}
            </div>
            <span style={{ border: `2px solid ${style.backgroundColor}` }}>
              {totalInCart.quantity}
            </span>
          </div>
        </div>
      </Container>

      <TopCart showCart={showCart} handleCloseTopCart={handleCloseTopCart} />
    </div>
  );
};

export default TopNav;
