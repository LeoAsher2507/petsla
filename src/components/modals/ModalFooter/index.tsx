import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { RootState } from 'src/stores/rootReducer';
import { ERequestStatus } from 'src/types/commonType';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';

interface IModalFooterProps {
  handleClose: () => void;
  handleSave?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  saveBtnTitle?: string;
}

const ModalFooter = ({
  handleClose,
  type,
  saveBtnTitle,
  handleSave,
}: IModalFooterProps) => {
  const { requestStatus } = useAppSelector(
    (state: RootState) => state.authState
  );

  return (
    <Modal.Footer className='d-flex justify-content-between'>
      <Button variant='secondary' onClick={handleClose}>
        Close
      </Button>
      <Button
        type={type || 'submit'}
        onClick={handleSave ? handleSave : () => {}}>
        {requestStatus === ERequestStatus.PENDING ? (
          <>
            <Spinner animation='border' size='sm' /> Loading...
          </>
        ) : (
          saveBtnTitle || 'Save'
        )}
      </Button>
    </Modal.Footer>
  );
};

export default ModalFooter;
