import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import ModalFooter from 'src/components/modals/ModalFooter';
import { ILoginRequestData } from 'src/types/authTypes';
import './AuthFormModal.scss';

interface IProps {
  modalTitle: string;
  form: UseFormReturn<ILoginRequestData, object>;
  handleLogin: (data: ILoginRequestData) => void;
  handleClose: () => void;
  children: React.ReactNode;
}

const AuthFormModal = ({
  modalTitle,
  form,
  handleLogin,
  handleClose,
  children,
}: IProps) => {
  return (
    <Form onSubmit={form.handleSubmit(handleLogin)} className='auth-form-modal'>
      <Modal.Header className='auth-modal-header' closeButton>
        <span>{modalTitle}</span>
      </Modal.Header>
      <Modal.Body className=''>{children}</Modal.Body>
      <ModalFooter handleClose={handleClose} />
    </Form>
  );
};

export default AuthFormModal;
