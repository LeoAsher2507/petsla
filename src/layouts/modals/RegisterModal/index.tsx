import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthFormModal from 'src/layouts/modals/AuthFormModal';
import { registerMethod } from 'src/services/auth/authAction';
import {
  setLoginModalIsOpen,
  setRegisterModalIsOpen,
} from 'src/services/modal/modalSlice';
import { RootState } from 'src/stores/rootReducer';
import { IRegisterFormData } from 'src/types/authTypes';
import { EModalType } from 'src/types/commonType';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import { registerSchema } from 'src/utils/yup';
import './RegisterModal.scss';

const RegisterModal = () => {
  const defaultValues: IRegisterFormData = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  };

  const { registerModalIsOpen } = useAppSelector(
    (state: RootState) => state.modalState
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const form = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const handleClose = useCallback(() => {
    form.reset();
    navigate(-1);
    dispatch(setRegisterModalIsOpen(false));
  }, [dispatch, form, navigate]);

  const handleChangeToLogin = () => {
    form.reset();
    dispatch(setRegisterModalIsOpen(false));
    dispatch(setLoginModalIsOpen(true));
  };

  const handleLogin = (data: IRegisterFormData) => {
    dispatch(
      registerMethod({
        ...data,
        first_name: data.firstName,
        last_name: data.lastName,
      })
    );
  };

  return (
    <Modal
      className='register-modal'
      show={registerModalIsOpen}
      onHide={handleClose}
      centered>
      <AuthFormModal
        modalTitle={t('title.register')}
        form={form}
        handleLogin={handleLogin}
        handleClose={handleClose}
        handleChangeModal={handleChangeToLogin}
        modalType={EModalType.REGISTER}>
        <Form.Group className='mt-3' controlId='firstName'>
          <Form.Control
            type='text'
            {...form.register('firstName')}
            name='firstName'
            placeholder={t('label.firstName')}
          />
          <Form.Text className='text-danger'>
            {form.formState.errors.firstName?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className='mt-3' controlId='lastName'>
          <Form.Control
            type='text'
            {...form.register('lastName')}
            name='lastName'
            placeholder={t('label.lastName')}
          />
          <Form.Text className='text-danger'>
            {form.formState.errors.lastName?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className='mt-3' controlId='email'>
          <Form.Control
            type='email'
            {...form.register('email')}
            name='email'
            placeholder='Email'
          />
          <Form.Text className='text-danger'>
            {form.formState.errors.email?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className='mt-3' controlId='username'>
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
      </AuthFormModal>
    </Modal>
  );
};

export default RegisterModal;
