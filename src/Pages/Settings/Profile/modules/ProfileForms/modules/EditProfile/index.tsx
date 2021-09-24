import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { UserModel } from '@/Models/Contract';
import { MaskedInput } from 'antd-mask-input';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { ChangeEmailModal } from '@/Modals';
import { AppDispatch } from '@/Reducer/Store';
import './styles.scss';
import { BaseResponse } from '@/Api';

type FormData = Pick<UserModel, 'first_name' | 'email' | 'last_name' | 'phone_number'>;

type Props = {};

const EditProfileComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const [form] = Form.useForm();
  const user = useSelector(userSelectors.user);

  const [modalData, setModalData] = useState<FormData>();

  // Обновление формы при изменении пользователя
  useEffect(() => {
    form.resetFields();
  }, [user]);

  // Отправка формы или открытие модалки, если меняется имейл
  const onSubmit = (data: FormData) => {
    if (user) {
      if (user.email.localeCompare(data.email)) {
        setModalData(data);
        return;
      } // if

      dispatch(userAsyncActions.update({ ...user, ...data })).then((response) => {
        if ((response.payload as BaseResponse<void>)?.status) {
          message.success('Данные успешно отредактированы!');
        } // if
      });
    } // if
  }; // onSubmit

  // Обновление данных в базе при пдтверждении изменения имейла
  const onEmailChangeConfirmed = () => {
    if (user) {
      dispatch(userAsyncActions.update({ ...user, ...modalData })).then((response) => {
        setModalData(undefined);

        if ((response.payload as BaseResponse<void>)?.status) {
          message.success('Данные успешно отредактированы!');
        } // if
      });
    } // if
  }; // onEmailChangeConfirmed

  return (
    <>
      {modalData && (
        <ChangeEmailModal
          email={modalData.email}
          visible={Boolean(modalData)}
          onConfirm={onEmailChangeConfirmed}
          onClose={() => setModalData(undefined)}
        />
      )}

      <Form<FormData>
        name="editProfile"
        layout="vertical"
        form={form}
        initialValues={{
          first_name: user?.first_name ?? '',
          email: user?.email ?? '',
          last_name: user?.last_name ?? '',
          phone_number: user?.phone_number ?? '',
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="first_name"
          label="Имя"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите имя!',
            },
          ]}
        >
          <Input placeholder="Имя" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Фамилия"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите фамилию!',
            },
          ]}
        >
          <Input placeholder="Фамилия" />
        </Form.Item>

        <Form.Item name="phone_number" label="Телефон">
          <MaskedInput placeholder="Телефон" mask="+7 111 111 11 11" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите почту!',
            },
            {
              type: 'email',
              message: 'Введите правильную почту!',
            },
          ]}
        >
          <Input placeholder="Почта" />
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
    </>
  );
};

export const EditProfile = React.memo(EditProfileComponent);
