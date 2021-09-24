import React from 'react';
import { RegisterForm, RegisterInfo } from './modules';
import './styles.scss';

type Props = {};

const RegisterComponent = ({}: Props): React.ReactElement => {
  return (
    <div className={'register'}>
      <RegisterForm />
      <RegisterInfo />
    </div>
  );
};

export const Register = React.memo(RegisterComponent);
