import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoProduct from 'src/components/NoProduct';
import TopCartItem from 'src/components/TopCartItem';
import {
  handleMinus,
  handlePlus,
  removeFromCart,
} from 'src/services/product/productSlice';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import './TopCart.scss';

interface ITopCartProps {
  showCart: boolean;
  handleCloseTopCart: () => void;
}

const TopCart = ({ showCart, handleCloseTopCart }: ITopCartProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { productState, themeState, authState } = useAppSelector(
    (state: RootState) => state
  );
  const { cartList, totalInCart } = productState;
  const { style, isLightTheme } = themeState;
  const { token } = authState;

  const dispatch = useAppDispatch();
  const handlePlusToCart = (id: number) => {
    dispatch(handlePlus(id));
  };

  const handleMinusToCart = (id: number) => {
    dispatch(handleMinus(id));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleViewCartClick = () => {
    navigate(ERouterPath.CART);
  };

  const handleCheckoutClick = () => {
    if (!token) {
      toast.warning(t('message.warning.loginFirst'));
    } else if (cartList.length <= 0) {
      toast.warning(t('message.warning.noProductInCart'));
    } else {
      navigate(ERouterPath.CUSTOMER_INFO);
    }
  };

  return (
    <Offcanvas
      className='top-cart'
      show={showCart}
      onHide={handleCloseTopCart}
      placement='end'
      style={{ backgroundColor: style.backgroundColor, color: style.color }}>
      <Offcanvas.Header
        className='top-cart-header'
        closeButton
        closeVariant={isLightTheme ? undefined : 'white'}>
        <Offcanvas.Title className='top-cart-title'>
          {`${t('title.cart')}: ${totalInCart.quantity} ${t('title.item')}`}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ padding: 0 }}>
        {cartList.length === 0 ? (
          <NoProduct message={t('message.warning.noProductInCart')} />
        ) : (
          cartList.map((product) => (
            <TopCartItem
              key={product.id}
              isLightTheme={isLightTheme}
              product={product}
              handlePlusToCart={handlePlusToCart}
              handleMinusToCart={handleMinusToCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))
        )}
      </Offcanvas.Body>

      <div className='top-cart-footer'>
        <Button className='top-cart-btn custom-btn' onClick={handleCheckoutClick}>
          {`${t('title.checkout')} (${totalInCart.price.toLocaleString()}đ)`}
        </Button>
        <Button className='top-cart-btn custom-btn bg-fill' onClick={handleViewCartClick}>
          {`${t('title.view')} ${t('title.cart')}`}
        </Button>
      </div>
    </Offcanvas>
  );
};

export default TopCart;
