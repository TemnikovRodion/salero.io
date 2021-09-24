import React, { useState } from 'react';
import { Text, Title } from '@/Components/_Common';
import { MailOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Reducer/Store';
import { PagesRouting } from '@/Routing';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { globalHistory } from '@/GlobalHistory';
import { BaseResponse, ResponseStatus } from '@/Api';
import './styles.scss';

type FormData = {
  email: string;
};

type Props = {};

const ForgotPasswordComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const [isEmailSended, setIsEmailSended] = useState(false);

  const onSubmit = (data: FormData) => {
    dispatch(userAsyncActions.sendResetPasswordEmail({ email: data.email })).then((response) => {
      if ((response.payload as BaseResponse<void>)?.status === ResponseStatus.success) {
        setIsEmailSended(true);
      } // if
    });
  }; // onSubmit

  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={9}>
            <Card>
              <div className="forgot-password-title-container">
                <Title level={2} className={'forgot-password-title'}>
                  {isEmailSended ? 'Ссылка для смены пароля успешно отправлена!' : 'Забыли пароль?'}
                </Title>
                <Text className={'forgot-password-text'}>
                  {isEmailSended
                    ? 'На вашу почту была отправлена ссылка для смены пароля'
                    : 'Введите Вашу почту чтобы восстановить пароль'}
                </Text>
              </div>

              {!isEmailSended ? (
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form<FormData> layout="vertical" name="forget-password" onFinish={(data) => onSubmit(data)}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Введите почту',
                          },
                          {
                            type: 'email',
                            message: 'Введите правильную почту',
                          },
                        ]}
                      >
                        <Input placeholder="Почта" prefix={<MailOutlined />} />
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                          Отправить
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              ) : (
                <Button type={'primary'} onClick={() => globalHistory.push(PagesRouting.Auth.Login)} block>
                  Войти
                </Button>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const ForgotPassword = React.memo(ForgotPasswordComponent);
