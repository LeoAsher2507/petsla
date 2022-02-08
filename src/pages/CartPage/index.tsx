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
import CheckoutSteps from 'src/components/CheckoutSteps';
import NoProduct from 'src/components/NoProduct';
import PageWrap from 'src/components/PageWrap';
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
              <NoProduct message='Không có sản phẩm nào trong giỏ hàng!' />
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
                    <span className='total-title'>Total Item:</span>
                    <span className='total-value'>
                      {`${totalInCart.quantity} items`}
                    </span>
                  </div>

                  <div className='header-wrap'>
                    <span className='total-title'>Total price:</span>
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
                          placeholder='Voucher'
                          id='cart-page-voucher'
                        />
                      </FormGroup>
                      <button className='cart-page-btn'>Apply Voucher</button>
                    </Form>

                    <FloatingLabel label='Brief Note'>
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
