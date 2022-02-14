import { t } from 'i18next';
import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from 'src/components/CheckoutSteps';
import PageWrap from 'src/components/Navigation/PageWrap';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import './CustomerInFoPage.scss';
const CustomerInFoPage = () => {
  const { themeState, productState, authState } = useAppSelector(
    (state: RootState) => state
  );
  const { style } = themeState;
  const { totalInCart } = productState;
  const { currentUser } = authState;

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ERouterPath.CART);
  };

  const handleNext = () => {
    navigate(ERouterPath.REVIEW);
  };

  useEffect(() => {
    setName(currentUser?.name || '');
  }, [currentUser]);

  return (
    <PageWrap className='cart-page'>
      <Container className='cart-page-container'>
        <Row>
          <CheckoutSteps pathname={ERouterPath.CUSTOMER_INFO} />
        </Row>

        <Row>
          <Col xs='12' md='7' lg='8'>
            <Card>
              <Card.Header className='cart-page-header'>
                Thông tin giao hàng
              </Card.Header>

              <Card.Body>
                <Form>
                  <Form.Group className='my-3'>
                    <Form.Control
                      type='text'
                      placeholder='Full name'
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className='my-3'>
                    <Form.Control
                      type='text'
                      placeholder='Phone number'
                      value={phoneNumber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPhoneNumber(e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className='my-3'>
                    <Form.Control
                      type='text'
                      placeholder='Address'
                      value={address}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setAddress(e.target.value)
                      }
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
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

                <div className='shop-note-wrap'>
                  <span className='note-title'>Chú ý: </span>

                  <span className='note-content'>
                    Hiện tại chúng tôi chỉ hỗ trợ thanh toán trực tiếp khi nhận
                    hàng.
                  </span>
                </div>

                <div className='cart-page-btn-wrap'>
                  <Row>
                    <Col>
                      <Button className='cart-page-btn' onClick={handleBack}>
                        Back
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className='cart-page-btn checkout-btn'
                        onClick={handleNext}>
                        Next
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageWrap>
  );
};

export default CustomerInFoPage;
