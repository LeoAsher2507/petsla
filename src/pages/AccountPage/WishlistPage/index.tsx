import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AccountPageHeader from 'src/pages/accountPage/components/AccountPageHeader';

const WishlistPage = () => {
  const { setShowDashboard } = useOutletContext<{
    setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  return (
    <div>
      <AccountPageHeader
        titleIcon={<i className='bi bi-heart-fill'></i>}
        headerTitle='Wishlist'
        btnTitle='Add all to cart'
        setShowDashboard={setShowDashboard}
      />
    </div>
  );
};

export default WishlistPage;
