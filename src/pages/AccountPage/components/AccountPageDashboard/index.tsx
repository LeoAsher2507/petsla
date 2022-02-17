import React from 'react';
import StyledLink from 'src/components/customComponents/StyledLink';
import { ERouterPath } from 'src/types/route';
import './AccountPageDashboard.scss';

interface IProps {
  setShowDashboard?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountPageDashboard = ({ setShowDashboard }: IProps) => {
  const handleDashboardItemClick = () => {
    if (!!setShowDashboard) {
      setShowDashboard(false);
    }
  };

  return (
    <div className='dashboard'>
      <h5 className='dashboard-header'>Dashboard</h5>

      <ul className='dashboard-nav-list'>
        <li onClick={handleDashboardItemClick} className='dashboard-nav-item'>
          <StyledLink to={ERouterPath.PROFILE}>
            <i className='bi bi-person'></i>
            <span className='title'>Profile</span>
          </StyledLink>
        </li>
        <li onClick={handleDashboardItemClick} className='dashboard-nav-item'>
          <StyledLink to={ERouterPath.ORDERS}>
            <i className='bi bi-bag'></i>
            <span className='title'>Orders</span>
          </StyledLink>
        </li>
        <li onClick={handleDashboardItemClick} className='dashboard-nav-item'>
          <StyledLink to={ERouterPath.WISH_LIST}>
            <i className='bi bi-heart'></i>
            <span className='title'>Wishlist</span>
          </StyledLink>
        </li>
      </ul>
    </div>
  );
};

export default AccountPageDashboard;
