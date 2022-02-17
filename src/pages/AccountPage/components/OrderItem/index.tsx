import moment from 'moment';
import React, { HTMLProps } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RootState } from 'src/stores/rootReducer';
import { EOrderStatus, IOrder } from 'src/types/productTypes';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import './OrderItem.scss';

interface IOrderItemProp extends HTMLProps<HTMLDivElement> {
  order: IOrder;
  index: number;
}

const OrderItem = ({ order, index, ...props }: IOrderItemProp) => {
  const { themeState } = useAppSelector((state: RootState) => state);
  const { style } = themeState;

  return (
    <div
      className='order-item shadow-sm rounded'
      {...props}
      style={{ backgroundColor: style.backgroundColor }}>
      <Link to={`${order.id}`} className='order-item-link'>
        <div className='order-row'>
          <div className='order-cell order-index'>{index}</div>

          <div className='order-cell order-id'>{order.id}</div>

          <div className='order-cell order-status'>
            {order.is_paid ? (
              <Badge pill bg='success'>
                {EOrderStatus[EOrderStatus.DELIVERED].toLowerCase()}
              </Badge>
            ) : order.is_delivered ? (
              <Badge pill bg='info'>
                {EOrderStatus[EOrderStatus.SHIPPING].toLowerCase()}
              </Badge>
            ) : (
              <Badge pill bg='primary'>
                {EOrderStatus[EOrderStatus.PENDING].toLowerCase()}
              </Badge>
            )}
          </div>

          <div className='order-cell order-time'>
            {moment(order.created_at || '').format('DD-MM-YYYY HH:mm')}
          </div>

          <div className='order-cell order-price'>
            {`${Intl.NumberFormat('vi-VN').format(order.total_price)}đ`}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OrderItem;
