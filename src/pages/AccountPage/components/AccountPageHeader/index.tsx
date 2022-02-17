import React, { HTMLProps, ReactElement, ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import './AccountPageHeader.scss';

interface IAccountPageHeaderProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  headerTitle?: string;
  btnTitle?: string;
  titleIcon?: ReactElement;
  handleBtnClick?: React.MouseEventHandler<HTMLButtonElement>;
  setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountPageHeader = ({
  children,
  headerTitle,
  btnTitle,
  titleIcon,
  handleBtnClick,
  setShowDashboard,
  ...props
}: IAccountPageHeaderProps) => {
  return (
    <div className='account-page-header' {...props}>
      <div className='title-wrap'>
        <div className='title'>
          {titleIcon}
          <span className='text'>{headerTitle}</span>
        </div>
        <div
          className='show-dashboard-btn'
          onClick={() => setShowDashboard(true)}>
          <i className='bi bi-list'></i>
        </div>
      </div>

      <div className='btn-wrap'>
        {btnTitle && (
          <Button
            className='custom-btn account-page-header-btn'
            onClick={handleBtnClick}>
            {btnTitle}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountPageHeader;
