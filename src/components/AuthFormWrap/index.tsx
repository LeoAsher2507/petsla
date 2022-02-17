import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { requestStatusSelector } from 'src/stores/rootReducer';
import { ILoginRequestData } from 'src/types/authTypes';
import { ERequestStatus } from 'src/types/commonType';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
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
  // const { requestStatus } = useAppSelector(
  //   (state: RootState) => state.authState
  // );
  const requestStatus = useAppSelector(requestStatusSelector);

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
              className={`${disableBtn ? 'isDisable' : ''} custom-btn bg-fill`}>
              {requestStatus === ERequestStatus.PENDING ? 'Loading' : title}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthFormWrap;
