import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NoProduct from 'src/components/NoProduct';
import TopCartItem from 'src/components/TopCartItem';
import {
  handleMinus,
  handlePlus,
  removeFromCart
} from 'src/services/product/productSlice';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector
} from 'src/utils/hook.ts/customReduxHook';
import './TopCart.scss';

interface ITopCartProps {
  showCart: boolean;
  handleCloseTopCart: () => void;
}

const TopCart = ({ showCart, handleCloseTopCart }: ITopCartProps) => {
  const navigate = useNavigate();

  const { productState, themeState } = useAppSelector(
    (state: RootState) => state
  );
  const { cartList, totalInCart } = productState;
  const { style, isLightTheme } = themeState;
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
          Cart: {totalInCart.quantity} items
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ padding: 0 }}>
        {cartList.length === 0 ? (
          <NoProduct message='Không có sản phẩm nào trong giỏ hàng!' />
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
        <button className='top-cart-btn'>
          {`Checkout (${totalInCart.price.toLocaleString()}đ)`}
        </button>
        <button className='top-cart-btn' onClick={handleViewCartClick}>
          View cart
        </button>
      </div>
    </Offcanvas>
  );
};

export default TopCart;
