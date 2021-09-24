import React, { useState } from 'react';
import { Text, Title } from '@/Components/_Common';
import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Reducer/Store';
import { PagesRouting } from '@/Routing';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { globalHistory } from '@/GlobalHistory';
import { BaseResponse, ResponseStatus } from '@/Api';
import './styles.scss';

type FormData = {
  password: string;
};

type Props = {};

const ResetPasswordComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const [uuid, setUuid] = useState<string | null>(window.location.href.split('?')[1]);
  const [isPasswordReseted, setIsPasswordReseted] = useState(false);

  const onSubmit = (data: FormData) => {
    if (uuid) {
      dispatch(userAsyncActions.resetPassword({ uuid: uuid, request: { password: data.password } })).then(
        (response) => {
          if ((response.payload as BaseResponse<void>)?.status === ResponseStatus.success) {
            setIsPasswordReseted(true);
            return;
          } // if

          setUuid(null);
        },
      );
    } // if
  }; // onSubmit

  return (
    <div className="reset-password">
      <div className="reset-password-container">
        <Row justify="center">
          <Col xs={18} sm={18} md={18} lg={9}>
            {uuid ? (
              <Card>
                <div className="reset-password-title-container">
                  <Title level={2} className={'reset-password-title'}>
                    Смена пароля
                  </Title>
                  <Text className={'reset-password-text'}>
                    {isPasswordReseted ? 'Пароль успешно изменен' : 'Введите новый пароль'}
                  </Text>
                </div>

                {!isPasswordReseted ? (
                  <Row justify="center">
                    <Col xs={24} sm={24} md={20} lg={20}>
                      <Form<FormData> layout="vertical" name="reset-password" onFinish={(data) => onSubmit(data)}>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: 'Введите пароль',
                            },
                          ]}
                        >
                          <Input.Password placeholder="Новый пароль" prefix={<LockOutlined />} />
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
            ) : (
              <Card>
                <div className="reset-password-title-container">
                  <Title level={2} className={'reset-password-title'}>
                    Что-то пошло не так...
                  </Title>
                  <Text className={'reset-password-text'}>Попробуйте заново отправить ссылку на почту</Text>
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const ResetPassword = React.memo(ResetPasswordComponent);
