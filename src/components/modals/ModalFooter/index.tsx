import React from 'react';
import { Button, Modal } from 'react-bootstrap';

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
  return (
    <Modal.Footer className='d-flex justify-content-between'>
      <Button variant='secondary' onClick={handleClose}>
        Close
      </Button>
      <Button
        type={type || 'submit'}
        onClick={handleSave ? handleSave : () => {}}>
        {saveBtnTitle || 'Save'}
      </Button>
    </Modal.Footer>
  );
};

export default ModalFooter;
