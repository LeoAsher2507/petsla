import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from 'src/components/Loading';
import { setLoginModalIsOpen } from 'src/services/modal/modalSlice';
import { getOneProductMethod } from 'src/services/product/productAction';
import {
  addToCart,
  resetCurrentProduct,
} from 'src/services/product/productSlice';
import { RootState } from 'src/stores/rootReducer';
import { ERequestStatus } from 'src/types/commonType';
import { ICartProduct } from 'src/types/productTypes';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import Media from 'src/utils/Media';
import './DetailProductPage.scss';

const DetailProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentProduct, requestStatus } = useAppSelector(
    (state: RootState) => state.productState
  );

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { style } = useSelector((state: RootState) => state.themeState);
  const { token } = useSelector((state: RootState) => state.authState);

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

  useEffect(() => {
    if (!Number(id) || !id) {
      navigate(ERouterPath.NOT_FOUND);
    } else dispatch(getOneProductMethod(id));

    return () => {
      dispatch(resetCurrentProduct());
    };
  }, [dispatch, id, navigate]);

  return (
    <div
      className='product-detail-page'
      style={{ backgroundColor: style.backgroundColor, color: style.color }}>
      {requestStatus === ERequestStatus.PENDING && <Loading />}
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
                <span>{currentProduct.price.toLocaleString()}??</span>
              </div>

              <div className='btn-wrap'>
                <Button
                  className='btn-item custom-btn '
                  onClick={() => handleBuyNowOnClick()}>
                  <span className=''>Buy Now</span>
                </Button>
                <Button
                  className='btn-item custom-btn bg-fill'
                  onClick={() => handleAddToCartClick()}>
                  <span className=''>Add to Cart</span>
                </Button>
              </div>

              <div
                className='product-desc'
                style={{ borderColor: style.borderColor }}>
                <h3 className='product-desc-title'>Th??ng tin s???n ph???m</h3>
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
    </div>
  );
};

export default DetailProductPage;
