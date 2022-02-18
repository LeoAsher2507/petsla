import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import CustomPagination from 'src/components/customComponents/CustomPagination';
import Loading from 'src/components/Loading';
import NoItems from 'src/components/NoItems';

import AccountPageHeader from 'src/pages/accountPage/components/AccountPageHeader';
import OrderItem from 'src/pages/accountPage/components/OrderItem';
import { getAllOrderMethod } from 'src/services/user/userAction';
import { RootState } from 'src/stores/rootReducer';
import { ERequestStatus } from 'src/types/commonType';
import { IOrder } from 'src/types/productTypes';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import './OrdersPages.scss';

const OrdersPages = () => {
  const { setShowDashboard } = useOutletContext<{
    setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { userState } = useAppSelector((state: RootState) => state);
  const { requestStatus, orders } = userState;

  React.useEffect(() => {
    dispatch(getAllOrderMethod());
  }, [dispatch]);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirsItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirsItem, indexOfLastItem);
  const listItemsPerPage = [5, 10, 15];

  return (
    <div className='orders-page'>
      {requestStatus === ERequestStatus.PENDING && <Loading />}
      <AccountPageHeader
        titleIcon={<i className='bi bi-bag-fill'></i>}
        headerTitle='My Orders'
        setShowDashboard={setShowDashboard}
      />

      <div className='orders-table'>
        <div className='orders-header order-row'>
          <div className='order-cell order-index'>#</div>
          <div className='order-cell order-id'>Order</div>
          <div className='order-cell order-status'>Status</div>
          <div className='order-cell order-time'>Time Placed</div>
          <div className='order-cell order-price'>Total Price</div>
        </div>

        <div className='orders-list'>
          {currentOrders.length <= 0 ? (
            <NoItems message={t('message.warning.noOrder')} />
          ) : (
            currentOrders.map((order: IOrder, index) => (
              <OrderItem key={order.id} order={order} index={index} />
            ))
          )}
        </div>

        <CustomPagination
          setItemsPerPage={setItemsPerPage}
          totalPage={Math.ceil(orders.length / itemsPerPage)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          listItemsPerPage={listItemsPerPage}
        />
      </div>
    </div>
  );
};

export default OrdersPages;
