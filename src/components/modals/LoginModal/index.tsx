import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AuthFormModal from 'src/components/modals/AuthFormModal';
import { loginMethod } from 'src/services/auth/authAction';
import { RootState } from 'src/stores/rootReducer';
import { ILoginRequestData } from 'src/types/authTypes';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import { loginSchema } from 'src/utils/yup';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal = ({ show, handleClose }: IProps) => {
  const defaultValues: ILoginRequestData = {
    username: '',
    password: '',
  };

  const { t } = useTranslation();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.authState.token);

  const handleLogin = (data: ILoginRequestData) => {
    dispatch(loginMethod(data));
  };

  useEffect(() => {
    if (token) {
      handleClose();
      form.reset();
    }

    return () => {
      form.reset()
    }
  }, [token, handleClose, form]);

  return (
    <Modal className='login-modal' show={show} onHide={handleClose} centered>
      <AuthFormModal
        modalTitle={t('title.login')}
        form={form}
        handleLogin={handleLogin}
        handleClose={handleClose}>
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
