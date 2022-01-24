import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AuthFormModal from 'src/components/modals/AuthFormModal';
import { loginMethod } from 'src/services/auth/authAction';
import { RootState } from 'src/stores/rootReducer';
import { ILoginRequestData } from 'src/types/authTypes';
import {
  useAppDispatch,
  useAppSelector
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

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const handleLogin = (data: ILoginRequestData) => {
    dispatch(loginMethod(data));
  };

  useEffect(() => {
    if (token) {
      handleClose();
      form.reset();
    }
  }, [token, handleClose, form]);

  return (
    <Modal className='login-modal' show={show} onHide={handleClose} centered>
      <AuthFormModal
        modalTitle='Login'
        form={form}
        handleLogin={handleLogin}
        handleClose={handleClose}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>User name</Form.Label>
          <Form.Control
            type='text'
            {...form.register('username')}
            name='username'
            placeholder='Enter username'
          />
          <Form.Text className='text-danger'>
            {form.formState.errors.username?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            {...form.register('password')}
            name='password'
            placeholder='Enter password'
          />
          <Form.Text className='text-danger'>
            {form.formState.errors.password?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Remember me?' />
        </Form.Group>
      </AuthFormModal>
    </Modal>
  );
};

export default LoginModal;
