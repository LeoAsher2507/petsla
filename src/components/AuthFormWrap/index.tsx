import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ILoginRequestData } from 'src/types/authTypes';
import './AuthFormWrap.scss';

interface IProps {
  title: string;
  children: React.ReactNode;
  form: UseFormReturn<FieldValues, object>;
  disableBtn?: boolean;
  handleSubmitClick: (data: ILoginRequestData) => void;
}

const AuthFormWrap = ({
  title,
  children,
  form,
  disableBtn,
  handleSubmitClick,
}: IProps) => {
  return (
    <Card className='shadow auth-form-wrap'>
      <Card.Title className='auth-form-title'>{title}</Card.Title>

      <Card.Body>
        <Form onSubmit={form.handleSubmit(handleSubmitClick)}>
          {children}

          <div className='action-wrap'>
            <Button
              type='submit'
              variant='primary'
              disabled={disableBtn ? disableBtn : false}
              className={disableBtn ? 'isDisable' : ''}>
              {title}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthFormWrap;
