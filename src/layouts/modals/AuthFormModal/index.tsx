import React from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import { RootState } from 'src/stores/rootReducer';
import { EModalType, ERequestStatus } from 'src/types/commonType';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import './AuthFormModal.scss';

interface IProps {
  modalTitle: string;
  form: UseFormReturn<any, object>;
  handleLogin: (data: any) => void;
  handleClose: () => void;
  handleChangeModal?: () => void;
  children: React.ReactNode;
  modalType?: EModalType;
}

const AuthFormModal = ({
  modalTitle,
  form,
  handleLogin,
  handleClose,
  handleChangeModal,
  modalType,
  children,
}: IProps) => {
  const { style, isLightTheme } = useAppSelector(
    (state: RootState) => state.themeState
  );

  const { requestStatus } = useAppSelector(
    (state: RootState) => state.authState
  );

  return (
    <Form
      style={{ backgroundColor: style.backgroundColor, color: style.color }}
      onSubmit={form.handleSubmit(handleLogin)}
      className='auth-form-modal'>
      <Modal.Header
        className='auth-modal-header'
        closeButton
        closeVariant={isLightTheme ? undefined : 'white'}>
        <span>{modalTitle}</span>
      </Modal.Header>
      <Modal.Body className=''>{children}</Modal.Body>

      <div className='action-wrap'>
        <Button className='btn-item mt-2 custom-btn bg-fill' type='submit'>
          {requestStatus === ERequestStatus.PENDING ? (
            <>
              <Spinner animation='border' size='sm' /> Loading...
            </>
          ) : (
            modalTitle || 'Save'
          )}
        </Button>

        <div className='separate-wrap'>
          <div className='separate-dash'></div>
          <div className='separate-text'>or</div>
          <div className='separate-dash'></div>
        </div>

        <Button className='btn-item google' type='submit'>
          {`${modalTitle} with Google`}
        </Button>

        <Button className='btn-item mt-3 facebook' type='submit'>
          {`${modalTitle} with Facebook`}
        </Button>
      </div>

      <div className='change-modal-wrap'>
        <div
          className='change-to-register change-modal-item'
          onClick={handleChangeModal}>
          {modalType === EModalType.LOGIN
            ? 'Do not have an account? Register'
            : 'Already have an account? Login'}
        </div>

        {modalType === EModalType.LOGIN && (
          <div className='forgot-password change-modal-item'>
            Forgot password?
          </div>
        )}
      </div>
      {/* <ModalFooter handleClose={handleClose} /> */}
    </Form>
  );
};

export default AuthFormModal;
