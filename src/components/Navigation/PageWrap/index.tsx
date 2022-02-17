import { Outlet } from 'react-router-dom';
import Footer from 'src/layouts/Footer';
import BottomNav from 'src/layouts/navbars/BottomNav';
import HigherTopNav from 'src/layouts/navbars/HigherTopNav';
import LowerTopNav from 'src/layouts/navbars/LowerTopNav';
import TopNav from 'src/layouts/navbars/TopNav';

const PageWrap = () => {
  return (
    <div>
      <HigherTopNav />
      <TopNav />
      <LowerTopNav />
      <Outlet />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default PageWrap;
