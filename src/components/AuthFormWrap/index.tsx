import React, { MouseEventHandler } from 'react';
import { Button, Card } from 'react-bootstrap';
import './AuthFormWrap.scss';

interface IProps {
  title: string;
  children: React.ReactNode;
  handleSubmitClick: MouseEventHandler<HTMLButtonElement>;
}

const AuthFormWrap = ({ title, children, handleSubmitClick }: IProps) => {
  return (
    <Card className='auth-form-wrap shadow'>
      <Card.Title className='auth-form-title'>{title}</Card.Title>

      <Card.Body>
        {children}

        <div className='action-wrap'>
          <Button variant='primary' onClick={handleSubmitClick}>
            {title}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AuthFormWrap;
