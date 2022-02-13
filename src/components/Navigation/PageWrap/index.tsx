import React, { HTMLProps, ReactNode } from 'react';
import BottomNav from 'src/layouts/BottomNav';
import Footer from 'src/layouts/Footer';
import HigherTopNav from 'src/layouts/HigherTopNav';
import LowerTopNav from 'src/layouts/LowerTopNav';
import TopNav from 'src/layouts/TopNav';

interface IPageWrap extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

const PageWrap = ({ children, ...props }: IPageWrap) => {
  return (
    <div {...props}>
      <HigherTopNav />
      <TopNav />
      <LowerTopNav />
      {children}
      <Footer />
      <BottomNav />
    </div>
  );
};

export default PageWrap;
