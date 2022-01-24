import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginModal from 'src/components/modals/LoginModal';
import { getOneProductMethod } from 'src/services/product/productAction';
import { RootState } from 'src/stores/rootReducer';
import { IProduct } from 'src/types/productTypes';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import './DetailProductPage.scss';

const DetailProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product: IProduct = useAppSelector(
    (state: RootState) => state.product.currentProduct
  );

  const { style } = useSelector((state: RootState) => state.theme);
  const { token } = useSelector((state: RootState) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // handle add to cart click
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

  useEffect(() => {
    if (id) dispatch(getOneProductMethod(id));
  }, [dispatch, id]);

  return (
    <div
      className='product-item-page'
      style={{ backgroundColor: style.backgroundColor, color: style.color }}>
      <Container>
        <Row>
          <Col md='6'>
            <div className='product-img__wrap'>
              <img
                src={
                  process.env.REACT_APP_BASE_URL + product.images ||
                  Media.errorLoading
                }
                alt=''
              />
            </div>
          </Col>

          <Col md='6'>
            <div className='product-detail-infor'>
              <h2 className='product-title'>{product.product_name}</h2>
              <div className='product-price'>
                <span>{product.price.toLocaleString()}đ</span>
              </div>

              <div className='btn-wrap'>
                <div className='btn-item' onClick={() => handleBuyNowOnClick()}>
                  <span className=''>Buy Now</span>
                </div>
                <div
                  className='btn-item'
                  onClick={() => handleAddToCartClick(product)}>
                  <span className=''>Add to Cart</span>
                </div>
              </div>

              <div
                className='product-desc'
                style={{ borderColor: style.borderColor }}>
                <h3 className='product-desc-title'>Thông tin sản phẩm</h3>
                {/* <span className="detail">{product.description}</span> */}
                <div
                  className='detail'
                  dangerouslySetInnerHTML={{
                    __html: product.description,
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
    </div>
  );
};

export default DetailProductPage;
