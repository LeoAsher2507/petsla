import React from 'react';
import { CloseButton } from 'react-bootstrap';
import { ICartProduct } from 'src/types/productTypes';
import './TopCartItem.scss';

interface ITopCartItemProps {
  isLightTheme?: boolean;
  product: ICartProduct;
  handlePlusToCart: (id: number) => void;
  handleMinusToCart: (id: number) => void;
  handleRemoveFromCart: (id: number) => void;
}

const TopCartItem = ({
  isLightTheme,
  product,
  handlePlusToCart,
  handleMinusToCart,
  handleRemoveFromCart,
}: ITopCartItemProps) => {
  return (
    <div className='top-cart-item'>
      <div className='quantity-wrap'>
        <button
          className='quantity-btn'
          onClick={() => handlePlusToCart(product.id)}>
          <i className='bi bi-plus'></i>
        </button>
        <span className='quantity'>{product.quantity}</span>
        <button
          disabled={product.quantity <= 1}
          className={`quantity-btn ${product.quantity <= 1 ? 'disabled' : ''}`}
          onClick={() => handleMinusToCart(product.id)}>
          <i className='bi bi-dash'></i>
        </button>
      </div>

      <div className='product-info'>
        <div
          className='product-img'
          style={{
            backgroundImage: `url('${
              process.env.REACT_APP_BASE_URL + product.images
            }')`,
          }}></div>
        <div className='product-description'>
          <div className='product-name'>{product.product_name}</div>
          <div className='product-price'>
            {`${product.price.toLocaleString()}đ x ${product.quantity}`}
          </div>
          <div className='product-total-price'>
            {`${(product.price * product.quantity).toLocaleString()}đ`}
          </div>
        </div>
      </div>

      <div className='action-wrap'>
        <CloseButton
          aria-label='Remove From Cart'
          variant={isLightTheme ? undefined : 'white'}
          onClick={() => handleRemoveFromCart(product.id)}
        />
      </div>
    </div>
  );
};

export default TopCartItem;
