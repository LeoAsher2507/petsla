import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutSteps from 'src/pages/checkoutStepPages/components/CheckoutSteps';
import { addOrderMethod } from 'src/services/user/userAction';
import { RootState } from 'src/stores/rootReducer';
import { IOrderInfo } from 'src/types/authTypes';
import { ICartProduct, IRequestedOrder } from 'src/types/productTypes';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import { customerInfoPageSchema } from 'src/utils/yup';
import './CustomerInFoPage.scss';
const CustomerInFoPage = () => {
  const { themeState, productState, userState } = useAppSelector(
    (state: RootState) => state
  );
  const { style } = themeState;
  const { totalInCart, cartList } = productState;
  const { currentOrderInfo } = userState;

  const defaultValues: IOrderInfo = {
    name: currentOrderInfo?.name || '',
    phoneNumber: currentOrderInfo?.phoneNumber || '',
    address: currentOrderInfo?.address || '',
    note: currentOrderInfo?.note,
  };
  const { t } = useTranslation();
  const form = useForm({
    resolver: yupResolver(customerInfoPageSchema),
    defaultValues,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    navigate(ERouterPath.CART);
  };

  const handleNext = (event: any): void => {
    const order: IRequestedOrder = {
      orderItems: cartList.map((product: ICartProduct) => ({
        product_id: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      number_phone: form.getValues('phoneNumber'),
      address: form.getValues('address'),
      note: form.getValues('note'),
      total_price: totalInCart.price,
    };
    if (totalInCart.quantity <= 0) {
      toast.warning(t('message.noProductInCart'));
    } else dispatch(addOrderMethod(order));
  };

  useEffect(() => {
    form.setValue('name', currentOrderInfo?.name || '');
  }, [form, currentOrderInfo]);

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form]);

  return (
    <div className='cart-page'>
      <Container className='cart-page-container'>
        <Row>
          <CheckoutSteps pathname={ERouterPath.CUSTOMER_INFO} />
        </Row>

        <Form onSubmit={form.handleSubmit(handleNext)}>
          <Row>
            <Col xs='12' md='7' lg='8'>
              <Card>
                <Card.Header className='cart-page-header'>
                  Thông tin giao hàng
                </Card.Header>

                <Card.Body>
                  <Form.Group className='my-3'>
                    <Form.Label> {t('label.fullname')} </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Full name'
                      {...form.register('name')}
                    />
                    <Form.Text className='text-danger'>
                      {form.formState.errors.name?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className='my-3'>
                    <Form.Label> {t('label.phoneNumber')} </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Phone number'
                      {...form.register('phoneNumber')}
                    />
                    <Form.Text className='text-danger'>
                      {form.formState.errors.phoneNumber?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className='my-3'>
                    <Form.Label> {t('label.address')} </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Address'
                      {...form.register('address')}
                    />
                    <Form.Text className='text-danger'>
                      {form.formState.errors.address?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Label> {t('label.note')} </Form.Label>
                  <FloatingLabel label={t('label.note')}>
                    <Form.Control
                      style={{
                        backgroundColor: style.backgroundColor1,
                        color: style.color,
                      }}
                      {...form.register('note')}
                      className='cart-page-note'
                      as='textarea'
                      type='text'
                      placeholder='Brief Note'
                    />
                  </FloatingLabel>
                </Card.Body>
              </Card>
            </Col>
            <Col xs='12' md='5' lg='4'>
              <Card
                style={{
                  backgroundColor: style.backgroundColor,
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
                      Hiện tại chúng tôi chỉ hỗ trợ thanh toán trực tiếp khi
                      nhận hàng.
                    </span>
                  </div>

                  <div className='cart-page-btn-wrap'>
                    <Row>
                      <Col>
                        <Button
                          className='cart-page-btn custom-btn'
                          onClick={handleBack}>
                          Back
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          type='submit'
                          className='cart-page-btn checkout-btn custom-btn bg-fill'>
                          Next
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CustomerInFoPage;
