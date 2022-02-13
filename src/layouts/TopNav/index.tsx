import React, { ChangeEvent, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import StyledLink from 'src/components/customComponents/StyledLink';
import TopCart from 'src/layouts/TopCart';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import './TopNav.scss';

const TopNav = () => {
  const { themeState, productState } = useAppSelector(
    (state: RootState) => state
  );
  const { t } = useTranslation();
  const { style } = themeState;
  const { totalInCart } = productState;

  const [searchTerm, setSearchTerm] = useState('');

  // const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleCloseTopCart = () => {
    setShowCart(false);
  };

  const handleSearch = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className='top-nav' style={{ backgroundColor: style.backgroundColor }}>
      <Container className="top-nav-container">
        <div className='top-nav__branch d-none d-md-flex '>
          <StyledLink to={ERouterPath.HOME}>
            <img src={Media.fullLogo} alt='' />
          </StyledLink>
        </div>

        <div className='search-wrap'>
          <Form onSubmit={handleSearch}>
            <Form.Group className='d-flex'>
              <Button className='search-btn' type='submit'>
                Search
              </Button>
              <Form.Control
                style={{
                  backgroundColor: style.backgroundColor1,
                  color: style.color,
                }}
                className='input-search'
                type='text'
                name='searchTerm'
                value={searchTerm}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(event.target.value)
                }
                placeholder='Anything here is better than your ex'></Form.Control>
            </Form.Group>
          </Form>
        </div>

        <div className='top-nav-btn-wrap'>
          {/* <div className='top-nav-item language-wrap'>
            <ChangeLangPopOver />
          </div> */}

          {/* <div
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
          </div> */}

          {/* <div className='auth-btn__wrap top-nav-item'>
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
          </div> */}

          <div
            className='top-nav__cart top-nav-item'
            onClick={() => {
              console.log('ahihi22');
              setShowCart(true);
            }}>
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
