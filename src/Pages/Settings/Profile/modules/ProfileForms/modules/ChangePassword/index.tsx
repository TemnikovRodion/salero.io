import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { AppDispatch } from '@/Reducer/Store';
import { BaseResponse, ResponseStatus } from '@/Api';
import './styles.scss';

type FormData = {
  password: string;
  password_confirm: string;
};

type Props = {};

const ChangePasswordComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector(userSelectors.user);
  const [form] = Form.useForm();

  // Отправка формы
  const onSubmit = (data: FormData) => {
    if (user) {
      dispatch(
        userAsyncActions.changePassword({
          password: data.password,
        }),
      ).then((resonse) => {
        if ((resonse.payload as BaseResponse<void>).status === ResponseStatus.success) {
          form.resetFields();
          message.success('Пароль успешно изменен!');
        } // if
      });
    } // if
  }; // onSubmit

  return (
    <Form<FormData> name="changePassword" layout="vertical" form={form} onFinish={onSubmit}>
      <Form.Item
        label="Новый пароль"
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите новый пароль!',
          },
        ]}
      >
        <Input.Password placeholder="Пароль" />
      </Form.Item>

      <Form.Item
        name="password_confirm"
        label="Подтвердите пароль"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, подтвердите пароль!',
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
      >
        <Input.Password placeholder="Повторите пароль" />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            disabled={!form.isFieldsTouched() || !!form.getFieldsError().filter(({ errors }) => errors.length).length}
            type="primary"
            htmlType="submit"
          >
            Сохранить изменения
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export const ChangePassword = React.memo(ChangePasswordComponent);
