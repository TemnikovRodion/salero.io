import React from 'react';
import { Link, Text, Title } from '@/Components/_Common';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { PagesRouting } from '@/Routing';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Reducer/Store';
import { userAsyncActions } from '@/Reducer/User/reducer';
import './styles.scss';

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = (): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    dispatch(
      userAsyncActions.login({
        email: data.email,
        password: data.password,
      }),
    );
  }; // onSubmit

  return (
    <div className={'login-form'}>
      <div className={'login-form-title'}>
        <Title level={1}>{'Вход'}</Title>

        <Text>
          {'Еще не зарегистрированы? '}
          <Link location={PagesRouting.Auth.Register} color={'blue'}>
            {'Зарегистрироваться'}
          </Link>
        </Text>
      </div>

      <Form<FormData> layout="vertical" name="login-form" onFinish={(data) => onSubmit(data)}>
        <Form.Item
          name="email"
          label={<Text weight={'medium'}>{'Почта'}</Text>}
          rules={[
            {
              required: true,
              message: 'Введите свою почту',
            },
            {
              type: 'email',
              message: 'Введите правильную почту',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <div className="login-lable-wapper">
              <Text weight={'medium'}>{'Пароль'}</Text>
              <Link
                location={PagesRouting.Auth.ForgotPassword}
                className={'login-lable-forgot-password'}
                color={'gray'}
              >
                {'Забыли пароль?'}
              </Link>
            </div>
          }
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={false}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
