import React from 'react';
import { Modal } from 'react-bootstrap';
import { setCheckoutModalIsOpen } from 'src/services/modal/modalSlice';
import { RootState } from 'src/stores/rootReducer';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import './CheckoutModal.scss';

const CheckoutModal = () => {
  const { checkoutModalIsOpen } = useAppSelector(
    (state: RootState) => state.modalState
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setCheckoutModalIsOpen(false));
  };

  return (
    <Modal
      className='checkout-modal'
      show={checkoutModalIsOpen}
      onHide={handleClose}>
      <div>ahihi</div>
    </Modal>
  );
};

export default CheckoutModal;
