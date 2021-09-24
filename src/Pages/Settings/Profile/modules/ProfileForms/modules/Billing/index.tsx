import React, { useEffect } from 'react';
import { UserProfileModel } from '@/Models/Contract';
import { userSelectors } from '@/Reducer/User/selectors';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { AppDispatch } from '@/Reducer/Store';
import TextArea from 'antd/lib/input/TextArea';
import { BaseResponse, ResponseStatus } from '@/Api';
import './styles.scss';

type FormData = UserProfileModel;

type Props = {};

const BillingComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const [form] = Form.useForm();
  const user = useSelector(userSelectors.user);

  // Обновление формы при изменении пользователя
  useEffect(() => {
    form.resetFields();
  }, [user]);

  return (
    <Form<FormData>
      name="billing"
      layout="vertical"
      form={form}
      initialValues={{
        company_name: user?.profile?.company_name,
        address: user?.profile?.address,
        inn: user?.profile?.inn,
        kpp: user?.profile?.kpp,
      }}
      onFinish={(data) => {
        if (user) {
          dispatch(userAsyncActions.updateProfile(data)).then((response) => {
            if ((response.payload as BaseResponse<void>)?.status) {
              message.success('Данные успешно отредактированы!');
            } // if
          });
        } // if
      }}
    >
      <Form.Item
        label="Компания"
        name="company_name"
        rules={[
          {
            message: 'Пожалуйста, введите новое название!',
          },
        ]}
      >
        <Input placeholder="Название компании" />
      </Form.Item>

      <Form.Item
        label="Адрес"
        name="address"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите новый адрес!',
          },
        ]}
      >
        <TextArea placeholder="Введите ваш юридический адрес" rows={4} />
      </Form.Item>

      <Form.Item
        label="ИНН"
        name="inn"
        rules={[
          {
            min: 10,
            max: 12,
            message: 'ИНН должен быть от 10 до 12 символов!',
          },
        ]}
      >
        <Input placeholder="Включает 10 или 12 знаков" type="number" />
      </Form.Item>

      <Form.Item
        label="КПП"
        name="kpp"
        rules={[
          {
            min: 9,
            max: 9,
            message: 'КПП должен быть равен 9 символам!',
          },
        ]}
      >
        <Input placeholder="Включает 9 знаков" type="number" />
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

export const Billing = React.memo(BillingComponent);
