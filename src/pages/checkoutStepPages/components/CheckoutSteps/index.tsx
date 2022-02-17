import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import './CheckoutSteps.scss';

interface ICheckoutStepsProps {
  pathname: string;
}

const CheckoutSteps = ({ pathname }: ICheckoutStepsProps) => {
  const { totalInCart } = useAppSelector(
    (state: RootState) => state.productState
  );

  const { t } = useTranslation();

  const handleChangeToCustomerInfoClick = () => {
    if (totalInCart.quantity <= 0) {
      toast.warning(t('message.warning.noProductInCart'));
    }
  };

  return (
    <Breadcrumb className='checkout-steps'>
      <Breadcrumb.Item
        className='checkout-step'
        active={pathname === ERouterPath.CART}
        linkAs={Link}
        linkProps={{ to: ERouterPath.CART }}>
        Cart
      </Breadcrumb.Item>
      <Breadcrumb.Item
        className='checkout-step'
        active={pathname === ERouterPath.CUSTOMER_INFO}
        linkAs={Link}
        onClick={handleChangeToCustomerInfoClick}
        linkProps={{
          to: totalInCart.quantity <= 0 ? '' : ERouterPath.CUSTOMER_INFO,
        }}>
        Customer Info
      </Breadcrumb.Item>
      {/* <Breadcrumb.Item
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
      </Breadcrumb.Item> */}
    </Breadcrumb>
  );
};

export default CheckoutSteps;
