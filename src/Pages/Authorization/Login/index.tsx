import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LoginForm, LoginInfo } from './modules';
import { userActions } from '@/Reducer/User/reducer';
import { cookieUtils } from '@/Utils';
import './styles.scss';

type Props = {};

const LoginComponent = ({}: Props): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    cookieUtils.removeCookie(AUTH_COOKIE_NAME);
    dispatch(userActions.setUser(null));
  }, []);

  return (
    <div className={'login'}>
      <LoginForm />
      <LoginInfo />
    </div>
  );
};

export const Login = React.memo(LoginComponent);
