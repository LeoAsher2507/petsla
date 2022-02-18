import moment from 'moment';
import React from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Loading from 'src/components/Loading';
import AccountPageHeader from 'src/pages/accountPage/components/AccountPageHeader';
import {
  addOrderMethod,
  getOneOrderMethod,
} from 'src/services/user/userAction';
import { RootState } from 'src/stores/rootReducer';
import { ERequestStatus } from 'src/types/commonType';
import {
  EOrderStatus,
  IOrderItem,
  IRequestedOrder,
} from 'src/types/productTypes';
import { ERouterPath } from 'src/types/route';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import './DetailOrderPage.scss';

const DetailOrderPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { setShowDashboard } = useOutletContext<{
    setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const { userState, themeState } = useAppSelector((state: RootState) => state);
  const { requestStatus, currentOrder } = userState;
  const { style } = themeState;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBuyAgainClick = () => {
    if (currentOrder) {
      const order: IRequestedOrder = {
        orderItems: currentOrder?.orderItems.map((product: IOrderItem) => ({
          product_id: product.id,
          quantity: product.quantity,
          price: Number(product.price),
        })),
        number_phone: currentOrder?.number_phone || '',
        address: currentOrder?.address || '',
        note: currentOrder?.note,
        total_price: currentOrder?.total_price,
      };

      dispatch(addOrderMethod(order));
    }
  };

  React.useEffect(() => {
    if (!Number(id)) {
      navigate(ERouterPath.NOT_FOUND);
    } else dispatch(getOneOrderMethod(Number(id)));
  }, [id, dispatch, navigate]);

  return (
    <div className='detail-order-page'>
      {requestStatus === ERequestStatus.PENDING && <Loading />}
      <AccountPageHeader
        titleIcon={<i className='bi bi-bag-fill'></i>}
        headerTitle='Order Detail'
        setShowDashboard={setShowDashboard}
        handleBtnClick={handleBuyAgainClick}
        btnTitle='Buy again'
      />

      <div className='detail-order-body mt-3'>
        <Card style={{ backgroundColor: style.backgroundColor }}>
          <Card.Header>
            <div className='detail-card-header'>
              <div className='header-item order-id'>
                <span className='title'>Order ID: </span>
                <span className='value'>{currentOrder?.id}</span>
              </div>
              <div className='header-item order-placed'>
                <span className='title'>Place on: </span>
                <span className='value'>
                  {moment(currentOrder?.created_at || '').format(
                    'DD-MM-YYYY HH:mm'
                  )}
                </span>
              </div>
              <div className='header-item order-status'>
                <span className='title'>Status: </span>
                <span className='value'>
                  {currentOrder?.is_paid ? (
                    <Badge pill bg='success'>
                      {EOrderStatus[EOrderStatus.DELIVERED].toLowerCase()}
                    </Badge>
                  ) : currentOrder?.is_delivered ? (
                    <Badge pill bg='info'>
                      {EOrderStatus[EOrderStatus.SHIPPING].toLowerCase()}
                    </Badge>
                  ) : (
                    <Badge pill bg='primary'>
                      {EOrderStatus[EOrderStatus.PENDING].toLowerCase()}
                    </Badge>
                  )}
                </span>
              </div>
            </div>
          </Card.Header>

          <Card.Body className='p-0'>
            {currentOrder?.orderItems.map((product: IOrderItem) => (
              <div className='detail-order-item'>
                <Link
                  className='detail-order-item-link'
                  to={`${ERouterPath.DETAIL_PRODUCT}-${product.product}`}>
                  <div className='product-info'>
                    <div
                      className='product-img'
                      style={{
                        backgroundImage: `url('${
                          process.env.REACT_APP_BASE_URL + product.image
                        }')`,
                      }}></div>
                    <div className='product-description'>
                      <div className='product-name'>{product.name}</div>
                      <div className='product-price'>
                        {`${product.price.toLocaleString()}đ x ${
                          product.quantity
                        }`}
                      </div>
                      <div className='product-total-price'>
                        {`${(
                          Number(product.price) * product.quantity
                        ).toLocaleString()}đ`}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>

      <div className='detail-order-info mt-4'>
        <Row>
          <Col xs='12' md='6'>
            <div
              className='info-col shadow-sm rounded'
              style={{ backgroundColor: style.backgroundColor }}>
              <div className='shipping-info'>
                <h5 className='info-header'>Shipping Information</h5>

                <div className='shipping-info-body'>
                  <li className='info-item'>
                    <span className='title'>Address: </span>
                    <span className='value'>{currentOrder?.address}</span>
                  </li>

                  <li className='info-item'>
                    <span className='title'>Phone Number: </span>
                    <span className='value'>{currentOrder?.number_phone}</span>
                  </li>

                  {currentOrder?.note && (
                    <li className='info-item'>
                      <span className='title'>Note: </span>
                      <span className='value'>{currentOrder?.note}</span>
                    </li>
                  )}
                </div>
              </div>
            </div>
          </Col>

          <Col xs='12' md='6'>
            <div
              className='info-col shadow-sm rounded'
              style={{ backgroundColor: style.backgroundColor }}>
              <div className='info-total-summary'>
                <h5 className='info-header'>Total Summary: </h5>

                <div className='header-wrap'>
                  <span className='total-title '>{`${t(
                    'title.quantity'
                  )}:`}</span>
                  <span className='total-value'>
                    {`${currentOrder?.orderItems.length} ${t('title.item')}`}
                  </span>
                </div>

                <div className='header-wrap'>
                  <span className='total-title'>{`${t(
                    'title.totalPrice'
                  )}:`}</span>
                  <span className='total-value'>
                    {`${Number(currentOrder?.total_price).toLocaleString()}đ`}
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailOrderPage;
