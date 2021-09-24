import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { Text } from '@/Components/_Common';
import { Modal } from '@/Components';
import { useDispatch } from 'react-redux';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { AppDispatch } from '@/Reducer/Store';
import { BaseResponse } from '@/Api';
import './styles.scss';

type Props = {
  email: string;
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ChangeEmail = ({ email, visible, onConfirm, onClose }: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const [password, setPassword] = useState('');

  const onOk = () => {
    dispatch(userAsyncActions.checkPassword({ password: password })).then((response) => {
      const status = (response.payload as BaseResponse<void>)?.status;

      if (status) {
        onConfirm();
      } // if
    });
  }; // onOk

  return (
    <Modal
      title={'Требование безопасности'}
      visible={visible}
      width={600}
      body={
        <div className={'modal-change-email'}>
          <Text>{`Для изменения почты необходимо ввести пароль для ${email}`}</Text>
          <Input
            type="password"
            value={password}
            placeholder="Введите пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      }
      buttons={
        <Button type="primary" onClick={onOk}>
          Сменить почту
        </Button>
      }
      onCancel={onClose}
    />
  );
};

export const ChangeEmailModal = React.memo(ChangeEmail);
