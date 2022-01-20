import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AuthFormWrap from 'src/components/AuthFormWrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from 'src/utils/yup';
import { ILoginRequestData } from 'src/types/userType';
import { useDispatch } from 'react-redux';
import { loginMethod } from 'src/services/auth/authAction';

const LoginPage = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log(
      'test data',
      methods.getValues('username'),
      methods.getValues('password')
    );
    const data: ILoginRequestData = {
      username: methods.getValues('username'),
      password: methods.getValues('password'),
    };

    dispatch(loginMethod(data));
  };

  return (
    <div className='login-page'>
      <AuthFormWrap title='Login' handleSubmitClick={handleLogin}>
        <Form onSubmit={handleLogin}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>User name</Form.Label>
            <Form.Control
              type='text'
              {...methods.register('username')}
              name='username'
              placeholder='Enter username'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              {...methods.register('password')}
              name='password'
              placeholder='Enter Password'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Remember me?' />
          </Form.Group>
        </Form>
      </AuthFormWrap>
    </div>
  );
};

export default LoginPage;
