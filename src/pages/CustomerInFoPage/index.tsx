import React from 'react';
import {
  Accordion,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import CheckoutSteps from 'src/components/CheckoutSteps';
import PageWrap from 'src/components/Navigation/PageWrap';
import { RootState } from 'src/stores/rootReducer';
import { ERouterPath } from 'src/types/route';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';

const CustomerInFoPage = () => {
  const { themeState } = useAppSelector((state: RootState) => state);
  const { style } = themeState;

  return (
    <PageWrap className='cart-page'>
      <Container className='cart-page-container'>
        <Row>
          <CheckoutSteps pathname={ERouterPath.CUSTOMER_INFO} />
        </Row>

        <Row>
          <Col xs='12' md='7' lg='8'>
            <Accordion defaultActiveKey='0'>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Mua hàng</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className='mb-3'>
                      <Form.Label>Full name</Form.Label>
                      <Form.Control type='text' placeholder='Full name' />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control type='text' placeholder='Phone number' />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control type='text' placeholder='Address' />
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Tặng quà</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col xs='12' md='5' lg='4'>
            <Card
              style={{
                backgroundColor: style.backgroundColor,
                // color: style.color,
              }}>
              <div className='cart-page-content'>
                <div className='body'>
                  <div className='voucher-wrap'>
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

export default CustomerInFoPage;
