import React, { MouseEventHandler } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

interface IProps {
  title: string;
  children: React.ReactNode;
  handleSubmitClick: MouseEventHandler<HTMLButtonElement>;
}

const AuthFormWrap = ({ title, children, handleSubmitClick }: IProps) => {
  return (
    <Card>
      <Card.Title>{title}</Card.Title>

      <Card.Body>
        <Form>
          {children}

          <div className='action-wrap'>
            <Button variant='primary' onClick={handleSubmitClick}>
              {title}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthFormWrap;
