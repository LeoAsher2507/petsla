import React, { useEffect, useState } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import AccountPageDashboard from 'src/pages/accountPage/components/AccountPageDashboard';
import {
  getAllOrderMethod,
  getUserInfoMethod,
} from 'src/services/user/userAction';
import { RootState } from 'src/stores/rootReducer';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import './AccountPage.scss';

const AccountPage = () => {
  const dispatch = useAppDispatch();

  const [showDashboard, setShowDashboard] = useState(false);

  const { style } = useAppSelector((state: RootState) => state.themeState);

  useEffect(() => {
    dispatch(getUserInfoMethod());
    dispatch(getAllOrderMethod());
  }, [dispatch]);

  return (
    <div className='account-page'>
      <Container className='account-page-container'>
        <Row>
          <Col xs={3} className='d-none d-lg-block'>
            <div
              style={{ backgroundColor: style.backgroundColor }}
              className='shadow-sm rounded dashboard-col'>
              <AccountPageDashboard />
            </div>
          </Col>

          <Col xs={12} lg={9}>
            {/* <Card> */}
            <div className='account-page-outlet'>
              <Outlet context={{ setShowDashboard }} />
            </div>
            {/* </Card> */}
          </Col>
        </Row>
      </Container>

      <Offcanvas
        style={{ width: '250px', backgroundColor: style.backgroundColor }}
        show={showDashboard}
        onHide={() => setShowDashboard(false)}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <AccountPageDashboard />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AccountPage;
