import React, { HTMLProps, ReactNode } from 'react';
import Footer from 'src/layouts/Footer';
import TopNav from 'src/layouts/TopNav';
import { RootState } from 'src/stores/rootReducer';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';

interface IPageWrap extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

const PageWrap = ({ children, ...props }: IPageWrap) => {
  const { style } = useAppSelector((state: RootState) => state.themeState);
  return (
    <div {...props} style={{ backgroundColor: style.backgroundColor1 }}>
      <TopNav />
      {children}
      <Footer />
    </div>
  );
};

export default PageWrap;
