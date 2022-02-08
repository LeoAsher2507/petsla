import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from 'src/components/Loading';
import LoginModal from 'src/components/modals/LoginModal';
import PageWrap from 'src/components/PageWrap';
import { getOneProductMethod } from 'src/services/product/productAction';
import {
  addToCart,
  resetCurrentProduct
} from 'src/services/product/productSlice';
import { RootState } from 'src/stores/rootReducer';
import { ERequestStatus } from 'src/types/commonType';
import { ICartProduct } from 'src/types/productTypes';
import {
  useAppDispatch,
  useAppSelector
} from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import './DetailProductPage.scss';

const DetailProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentProduct, requestState } = useAppSelector(
    (state: RootState) => state.productState
  );

  const { style } = useSelector((state: RootState) => state.themeState);
  const { token } = useSelector((state: RootState) => state.authState);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // handle add to cart click
  function handleAddToCartClick() {
    const newCartProduct: ICartProduct = {
      id: currentProduct.id,
      product_name: currentProduct.product_name,
      images: currentProduct.images,
      created_date: currentProduct.created_date,
      modified_date: currentProduct.modified_date,
      price: currentProduct.price,
      quantity: 1,
    };
    dispatch(addToCart(newCartProduct));
    toast.success('Thêm vào giỏ hàng thành công!');
  }

  const handleBuyNowOnClick = () => {
    if (token) {
      toast.success('Buy successfully!');
    } else {
      toast.warn('You have to login first!');
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    if (id) dispatch(getOneProductMethod(id));

    return () => {
      dispatch(resetCurrentProduct());
    };
  }, [dispatch, id]);

  return (
    <PageWrap
      className='product-detail-page'
      style={{ backgroundColor: style.backgroundColor, color: style.color }}>
      {requestState === ERequestStatus.PENDING && <Loading />}
      <Container className='product-detail'>
        <Row>
          <Col md='6'>
            <div className='product-img__wrap'>
              <img
                src={
                  process.env.REACT_APP_BASE_URL + currentProduct.images ||
                  Media.errorLoading
                }
                alt=''
              />
            </div>
          </Col>

          <Col md='6'>
            <div className='product-detail-infor'>
              <h2 className='product-title'>{currentProduct.product_name}</h2>
              <div className='product-price'>
                <span>{currentProduct.price.toLocaleString()}đ</span>
              </div>

              <div className='btn-wrap'>
                <div className='btn-item' onClick={() => handleBuyNowOnClick()}>
                  <span className=''>Buy Now</span>
                </div>
                <div
                  className='btn-item'
                  onClick={() => handleAddToCartClick()}>
                  <span className=''>Add to Cart</span>
                </div>
              </div>

              <div
                className='product-desc'
                style={{ borderColor: style.borderColor }}>
                <h3 className='product-desc-title'>Thông tin sản phẩm</h3>
                {/* <span className="detail">{currentProduct.description}</span> */}
                <div
                  className='detail'
                  dangerouslySetInnerHTML={{
                    __html: currentProduct.description,
                  }}></div>
              </div>
            </div>
            {/* end of product-detail-infor  */}
          </Col>
        </Row>
      </Container>
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
    </PageWrap>
  );
};

export default DetailProductPage;
