import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AccountPageHeader from 'src/pages/accountPage/components/AccountPageHeader';

const OrdersPages = () => {
  const { setShowDashboard } = useOutletContext<{
    setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  return (
    <div>
      <AccountPageHeader
        titleIcon={<i className='bi bi-person-fill'></i>}
        headerTitle='Profile'
        btnTitle='Edit Profile'
        setShowDashboard={setShowDashboard}
      />
    </div>
  );
};

export default OrdersPages;
