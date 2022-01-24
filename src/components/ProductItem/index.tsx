import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginModal from 'src/components/modals/LoginModal';
import { RootState } from 'src/stores/rootReducer';
import { IProduct } from 'src/types/productTypes';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import './ProductItem.scss';

const ProductItem = (props: any) => {
  const { product } = props;
  const productUrlImg = `url('${
    process.env.REACT_APP_BASE_URL + product.images || Media.errorLoading
  }')`;

  const token = useAppSelector((state: RootState) => state.auth.token);
  const [showLoginModal, setShowLoginModal] = useState(false);

  function handleAddToCartClick(product: IProduct) {
    toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
  }

  const handleBuyNowOnClick = () => {
    if (token) {
      toast.success('Buy successfully!');
    } else {
      toast.warn('You have to login first!');
      setShowLoginModal(true);
    }
  };

  const formatPrice = (price: number) => {
    let priceStr = new Intl.NumberFormat('de-DE').format(price);
    return priceStr;
  };

  return (
    <>
      <div className='product-item  mt-3 '>
        <Link
          to={ERouterPath.DETAIL_PRODUCT + '-' + product.id}
          state={{ product: product }}>
          <div
            className='ava'
            style={{
              paddingTop: '100%',
              backgroundImage: productUrlImg,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}></div>
        </Link>

        <div className='content p-2 p-lg-3'>
          <div className='desc'>
            <Link to={ERouterPath.DETAIL_PRODUCT + '-' + product.id}>
              <span className='title'>{product.product_name}</span>
            </Link>
            <div className='price'> {formatPrice(product.price)}</div>
          </div>
          <div className='buy-cart-wrap'>
            <div
              className='buy button-wrap'
              onClick={() => handleBuyNowOnClick()}>
              <i className='bi bi-bag  d-none d-md-block'></i>
              <span>Buy now</span>
            </div>

            <div
              className='cart button-wrap'
              onClick={() => handleAddToCartClick(product)}>
              <i className='bi bi-cart3'></i>
              <span className=' d-none d-xl-block'>Add to Cart</span>
            </div>
          </div>
        </div>
      </div>
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
