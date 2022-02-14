import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthFormModal from 'src/layouts/modals/AuthFormModal';
import { loginMethod } from 'src/services/auth/authAction';
import {
  setLoginModalIsOpen,
  setRegisterModalIsOpen,
} from 'src/services/modal/modalSlice';
import { RootState } from 'src/stores/rootReducer';
import { ILoginRequestData } from 'src/types/authTypes';
import { EModalType, ERequestStatus } from 'src/types/commonType';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import { loginSchema } from 'src/utils/yup';
import './LoginModal.scss';

const LoginModal = () => {
  const defaultValues: ILoginRequestData = {
    username: '',
    password: '',
  };

  const { t } = useTranslation();
  const { token, requestStatus } = useAppSelector(
    (state: RootState) => state.authState
  );

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginModalIsOpen } = useAppSelector(
    (state: RootState) => state.modalState
  );

  const handleLogin = (data: ILoginRequestData) => {
    dispatch(loginMethod(data));
  };

  const handleClose = useCallback(() => {
    dispatch(setLoginModalIsOpen(false));
    form.reset();
    navigate(-1);
  }, [dispatch, navigate, form]);

  const handleChangeToRegister = () => {
    form.reset();
    dispatch(setLoginModalIsOpen(false));
    dispatch(setRegisterModalIsOpen(true));
  };

  useEffect(() => {
    if (token && requestStatus !== ERequestStatus.PENDING) {
      form.reset();
      dispatch(setLoginModalIsOpen(false));
    }
  }, [token, form, requestStatus, dispatch]);

  return (
    <Modal
      className='login-modal'
      show={loginModalIsOpen}
      onHide={handleClose}
      centered>
      <AuthFormModal
        modalTitle={t('title.login')}
        form={form}
        handleLogin={handleLogin}
        handleClose={handleClose}
        handleChangeModal={handleChangeToRegister}
        modalType={EModalType.LOGIN}>
        <Form.Group className='mt-3' controlId='username'>
          {/* <Form.Label> {t('label.username')} </Form.Label> */}
          <Form.Control
            type='text'
            {...form.register('username')}
            name='username'
            placeholder={t('label.username')}
          />
          <Form.Text className='text-danger'>
            {form.formState.errors.username?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className='mt-3' controlId='password'>
          {/* <Form.Label> {t('label.password')} </Form.Label> */}
          <Form.Control
            type='password'
            {...form.register('password')}
            name='password'
            placeholder={t('label.password')}
          />
          <Form.Text className='text-danger'>
            {form.formState.errors.password?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className='mt-2' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label={t('label.rememberPassword')} />
        </Form.Group>
      </AuthFormModal>
    </Modal>
  );
};

export default LoginModal;
