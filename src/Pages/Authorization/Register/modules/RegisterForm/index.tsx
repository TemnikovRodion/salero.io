import React from 'react';
import { Link, Text, Title } from '@/Components/_Common';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { PagesRouting } from '@/Routing';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Reducer/Store';
import { userAsyncActions } from '@/Reducer/User/reducer';
import ym from 'react-yandex-metrika';
import { BaseResponse } from '@/Api';
import TagManager from 'react-gtm-module';
import './styles.scss';

type FormData = {
  email: string;
  password: string;
};

export const RegisterForm = (): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    dispatch(
      userAsyncActions.register({
        email: data.email,
        password: data.password,
      }),
    ).then((response) => {
      const status = (response.payload as BaseResponse<void>)?.status;
      if (status) {
        ym(String(YM_ACCOUNT), 'reachGoal', 'successfulRegistration');
        TagManager.dataLayer({
          dataLayer: {
            gtmId: GA_ACCOUNT,
            page: 'register',
          },
          dataLayerName: 'PageDataLayer',
        });
      } // if
    });
  }; // onSubmit

  return (
    <div className={'login-form'}>
      <div className={'login-form-title'}>
        <Title level={1}>{'Регистрация'}</Title>

        <div>
          <Text>
            {'У Вас уже есть аккаунт? '}
            <Link location={PagesRouting.Auth.Login} color={'blue'}>
              {'Войти'}
            </Link>
          </Text>
        </div>
      </div>

      <Form<FormData> layout="vertical" name="register-form" onFinish={(data) => onSubmit(data)}>
        <Form.Item
          name="email"
          label="Почта"
          rules={[
            {
              required: true,
              message: 'Введите свой почтовый адрес',
            },
            {
              type: 'email',
              message: 'Пожалуйста, введите правильный адрес',
            },
          ]}
          hasFeedback
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Подтверждение пароля"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите правильный пароль',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Пароли не совпадают!');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
