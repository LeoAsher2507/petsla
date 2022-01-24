import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from 'src/components/modals/ModalFooter';

interface IProps {
  show: boolean;
  modalContent: string;
  handleClose: () => void;
  handleSave: () => void;
  modalTitle?: string;
  saveBtnText?: string;
}

const ConfirmModal = ({
  modalTitle,
  modalContent,
  saveBtnText,
  show,
  handleClose,
  handleSave,
}: IProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {modalTitle && <Modal.Title> {modalTitle} </Modal.Title>}
      </Modal.Header>
      <Modal.Body> {modalContent} </Modal.Body>

      <ModalFooter
        handleClose={handleClose}
        handleSave={handleSave}
        saveBtnTitle={saveBtnText || 'Save'}
      />
    </Modal>
  );
};

export default ConfirmModal;
