import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ERouterPath } from 'src/types/route';

interface ICheckoutStepsProps {
  pathname: string;
}

const CheckoutSteps = ({ pathname }: ICheckoutStepsProps) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item
        active={pathname === ERouterPath.CART}
        linkAs={Link}
        linkProps={{ to: ERouterPath.CART }}>
        Cart
      </Breadcrumb.Item>
      <Breadcrumb.Item
        active={pathname === ERouterPath.CUSTOMER_INFO}
        linkAs={Link}
        linkProps={{ to: ERouterPath.CUSTOMER_INFO }}>
        Customer Info
      </Breadcrumb.Item>
      <Breadcrumb.Item
        active={pathname === ERouterPath.PAYMENT}
        linkAs={Link}
        linkProps={{ to: ERouterPath.PAYMENT }}>
        Payment
      </Breadcrumb.Item>
      <Breadcrumb.Item
        active={pathname === ERouterPath.REVIEW}
        linkAs={Link}
        linkProps={{ to: ERouterPath.REVIEW }}>
        Review
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default CheckoutSteps;
