import React, { FormEvent } from 'react';
import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CheckoutSteps from 'src/components/CheckoutSteps';
import NoProduct from 'src/components/NoProduct';
import PageWrap from 'src/components/Navigation/PageWrap';
import TopCartItem from 'src/components/TopCartItem';
import {
  handleMinus,
  handlePlus,
  removeFromCart,
} from 'src/services/product/productSlice';
import { RootState } from 'src/stores/rootReducer';
import { ICartProduct } from 'src/types/productTypes';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import './CartPage.scss';

const CartPage = () => {
  const { productState, themeState } = useAppSelector(
    (state: RootState) => state
  );

  const { t } = useTranslation();
  const { cartList, totalInCart } = productState;
  const { isLightTheme, style } = themeState;

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

  const handleApplyVoucherClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageWrap className='cart-page'>
      <Container className='cart-page-container'>
        <Row>
          <CheckoutSteps pathname={ERouterPath.CART} />
        </Row>

        <Row>
          <Col xs='12' md='7' lg='8'>
            {cartList.length === 0 ? (
              <NoProduct message={t('message.noProduct')} />
            ) : (
              <Card
                style={{
                  backgroundColor: style.backgroundColor,
                  // color: style.color,
                }}>
                <div className='cart-page-list'>
                  {cartList.map((product: ICartProduct) => (
                    <TopCartItem
                      key={product.id}
                      isLightTheme={isLightTheme}
                      product={product}
                      handlePlusToCart={handlePlusToCart}
                      handleMinusToCart={handleMinusToCart}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  ))}
                </div>
              </Card>
            )}
          </Col>
          <Col xs='12' md='5' lg='4'>
            <Card
              style={{
                backgroundColor: style.backgroundColor,
                // color: style.color,
              }}>
              <div className='cart-page-content'>
                <div className='header'>
                  <div className='header-wrap'>
                    <span className='total-title'>{`${t(
                      'title.quantity'
                    )}:`}</span>
                    <span className='total-value'>
                      {`${totalInCart.quantity} ${t('title.item')}`}
                    </span>
                  </div>

                  <div className='header-wrap'>
                    <span className='total-title'>{`${t(
                      'title.totalPrice'
                    )}:`}</span>
                    <span className='total-value'>
                      {`${totalInCart.price.toLocaleString()}đ`}
                    </span>
                  </div>
                </div>

                <div className='body'>
                  <div className='voucher-wrap'>
                    <Form onSubmit={handleApplyVoucherClick}>
                      <FormGroup>
                        <Form.Control
                          style={{
                            backgroundColor: style.backgroundColor1,
                            color: style.color,
                          }}
                          type='text'
                          placeholder={`${t('label.voucher')}`}
                          id='cart-page-voucher'
                        />
                      </FormGroup>
                      <button className='cart-page-btn'>{`${t('title.apply')} ${t('label.voucher').toLowerCase()}`}</button>
                    </Form>

                    <FloatingLabel label={t('label.note')}>
                      <Form.Control
                        style={{
                          backgroundColor: style.backgroundColor1,
                          color: style.color,
                        }}
                        className='cart-page-note'
                        as='textarea'
                        type='text'
                        placeholder='Brief Note'
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageWrap>
  );
};

export default CartPage;
