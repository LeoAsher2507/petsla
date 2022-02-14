import { t } from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setLoginModalIsOpen } from 'src/services/modal/modalSlice';
import { addToCart } from 'src/services/product/productSlice';
import { RootState } from 'src/stores/rootReducer';
import { ICartProduct, IProduct } from 'src/types/productTypes';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import './ProductItem.scss';

const ProductItem = (props: any) => {
  const { product } = props;
  const productUrlImg = `url('${
    process.env.REACT_APP_BASE_URL + product.images || Media.errorLoading
  }')`;

  const { authState, themeState } = useAppSelector((state: RootState) => state);
  const { token } = authState;
  const { style } = themeState;

  const dispatch = useAppDispatch();

  function handleAddToCartClick(product: IProduct) {
    const newCartProduct: ICartProduct = {
      id: product.id,
      product_name: product.product_name,
      images: product.images,
      created_date: product.created_date,
      modified_date: product.modified_date,
      price: product.price,
      quantity: 1,
    };
    dispatch(addToCart(newCartProduct));
    toast.success(t('message.success.addToCart'));
  }

  const handleBuyNowOnClick = () => {
    if (token) {
      toast.success(t('message.success.checkout'));
    } else {
      toast.warn(t('message.warning.loginFirst'));
      dispatch(setLoginModalIsOpen(true));
    }
  };

  const formatPrice = (price: number) => {
    let priceStr = new Intl.NumberFormat('de-DE').format(price);
    return priceStr;
  };

  return (
    <>
      <div
        className='product-item  mt-3 '
        style={{ backgroundColor: style.backgroundColor }}>
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
    </>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
