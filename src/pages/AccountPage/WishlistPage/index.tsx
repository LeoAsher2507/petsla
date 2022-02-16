import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AccountPageHeader from 'src/pages/accountPage/components/AccountPageHeader';

const WishlistPage = () => {
  const { setShowDashboard } = useOutletContext<{
    setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  return (
    <div>
      Wishli
      <AccountPageHeader
        titleIcon={<i className='bi bi-person-fill'></i>}
        headerTitle='Profile'
        btnTitle='Edit Profile'
        setShowDashboard={setShowDashboard}
      />
      stPage
    </div>
  );
};

export default WishlistPage;
