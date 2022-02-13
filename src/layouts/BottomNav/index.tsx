import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledLink from 'src/components/customComponents/StyledLink';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import './BottomNav.scss';

const BottomNav = () => {
  const { t } = useTranslation();
  const { style } = useAppSelector((state: RootState) => state.themeState);

  return (
    <div
      className='bottom-nav'
      style={{ backgroundColor: style.backgroundColor }}>
      <ul className='bottom-nav-list'>
        <li className='bottom-nav-item'>
          <StyledLink to={ERouterPath.HOME}>
            <div className='item-wrap'>
              <i className='bi bi-house'></i>
              <span className='text'>{t('title.homepage')}</span>
            </div>
          </StyledLink>
        </li>

        <li className='bottom-nav-item'>
          <StyledLink to={ERouterPath.SHOP}>
            <div className='item-wrap'>
              <i className='bi bi-shop-window'></i>
              <span className='text'>{t('title.shop')}</span>
            </div>
          </StyledLink>
        </li>

        <li className='bottom-nav-item'>
          <StyledLink to={ERouterPath.CART}>
            <div className='item-wrap'>
              <i className='bi bi-cart3'></i>
              <span className='text'>{t('title.cart')}</span>
            </div>
          </StyledLink>
        </li>

        <li className='bottom-nav-item'>
          <StyledLink to={ERouterPath.ACCOUNT}>
            <div className='item-wrap'>
              <i className='bi bi-person'></i>
              <span className='text'>{t('title.account')}</span>
            </div>
          </StyledLink>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
