import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthFormWrap from 'src/components/AuthFormWrap';
import { loginMethod } from 'src/services/auth/authAction';
import { RootState } from 'src/stores/rootReducer';
import { ILoginRequestData } from 'src/types/authTypes';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import { loginSchema } from 'src/utils/yup';

interface LocationState {
  from: {
    pathname: string;
  };
}

const LoginPage = () => {
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });

  const token = useAppSelector((state: RootState) => state.authState.token);

  const navigate = useNavigate();
  let location = useLocation();
  const { from } = (location.state as LocationState) || '/';
  const dispatch = useAppDispatch();

  const handleLogin = (data: ILoginRequestData) => {
    dispatch(loginMethod(data));
  };

  useEffect(() => {
    if (!!token) navigate(from.pathname, { replace: true });
  }, [token, navigate, from.pathname]);

  return (
    <div className='login-page'>
      <AuthFormWrap title='Login' form={form} handleSubmitClick={handleLogin}>
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
      </AuthFormWrap>
    </div>
  );
};

export default LoginPage;
