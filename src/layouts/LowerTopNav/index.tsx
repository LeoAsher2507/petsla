import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import StyledLink from 'src/components/customComponents/StyledLink';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import './LowerTopNav.scss';

const LowerTopNav = () => {
  const { style } = useAppSelector((state: RootState) => state.themeState);

  const { t } = useTranslation();

  return (
    <div
      className='lower-top-nav'
      style={{ backgroundColor: style.backgroundColor }}>
      <Container>
        <ul className='top-nav__list d-none d-md-flex'>
          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.HOME}>
              {t('title.homepage')}{' '}
            </StyledLink>
          </li>

          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.SHOP}>
              <span> {t('title.shop')} </span>
            </StyledLink>
          </li>

          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.CART}> {t('title.cart')} </StyledLink>
          </li>

          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.CONTACT}>
              {t('title.contact')}
            </StyledLink>
          </li>

          <li className='top-nav-item'>
            <StyledLink to={ERouterPath.ACCOUNT}>
              {t('title.account')}
            </StyledLink>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default LowerTopNav;
