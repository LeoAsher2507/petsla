import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

  let [searchParams, setSearchParams] = useSearchParams({
    search: '',
  });
  const [tempSearchTerm, setTempSearchTerm] = useState(
    searchParams.get('search') || ''
  );

  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const handleSearchTermChange = (value: string) => {
    setTempSearchTerm(value);
  };

  const [showCart, setShowCart] = useState(false);

  const handleCloseTopCart = () => {
    setShowCart(false);
  };

  const handleSearch = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchInputRef.current?.blur();
    if (tempSearchTerm) {
      setSearchParams({ search: tempSearchTerm });
    } else {
      setSearchParams({ search: '' });
      navigate(ERouterPath.SHOP);
    }
  };

  useEffect(() => {
    if (searchParams.get('search')) {
      setTempSearchTerm(searchParams.get('search') || '');
    }

    return () => {
      setTempSearchTerm('');
    };
  }, [setSearchParams, searchParams]);

  return (
    <div className='top-nav' style={{ backgroundColor: style.backgroundColor }}>
      <Container className='top-nav-container'>
        <div className='top-nav__branch d-none d-md-flex '>
          <StyledLink to={ERouterPath.HOME}>
            <img src={Media.fullLogo} alt='' />
          </StyledLink>
        </div>

        <div className='search-wrap'>
          <Form onSubmit={handleSearch}>
            <Form.Group className='d-flex'>
              <Form.Control
                ref={searchInputRef}
                style={{
                  backgroundColor: style.backgroundColor1,
                  color: style.color,
                }}
                className='input-search'
                type='text'
                name='search'
                value={tempSearchTerm}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleSearchTermChange(event.target.value)
                }
                placeholder='Everything here is better than your ex'
              />
              <Button className='search-btn custom-btn bg-fill' type='submit'>
                <i className='bi bi-search'></i>
                {/* {t('label.search')} */}
              </Button>
            </Form.Group>
          </Form>
        </div>

        <div className='top-nav-btn-wrap'>
          <div
            className='top-nav__cart top-nav-item'
            onClick={() => {
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
