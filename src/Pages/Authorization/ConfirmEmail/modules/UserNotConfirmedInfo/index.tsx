import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Reducer/Store';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { Text, Title } from '@/Components/_Common';
import { UserModel } from '@/Models/Contract';
import { Button } from 'antd';
import './styles.scss';

type Props = {
  user: UserModel;
};

const UserNotConfirmedInfoComponent = ({ user }: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const [emailSendedTimer, setEmailSendedTimer] = useState(0);

  // Отправка новой ссылки для активации почты
  const onSendEmailClick = () => {
    dispatch(userAsyncActions.sendEmail({ email: user.email })).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        const interval = setInterval(() => {
          setEmailSendedTimer((prev) => prev + 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          setEmailSendedTimer(0);
        }, 60000);
      } // if
    });
  }; // onSendEmailClick

  return (
    <>
      <div className={'confirm-email-text-wrapper'}>
        <Title level={1}>{'Для работы с сервисом необходимо подтвердить свою почту'}</Title>
        <Text>{`Письмо с ссылкой активации было отправлено на почтовый ящик ${user.email}`}</Text>
      </div>

      <Button type={'primary'} disabled={emailSendedTimer !== 0} onClick={() => onSendEmailClick()}>
        {emailSendedTimer === 0
          ? 'Отправить письмо еще раз'
          : `Письмо отправлено. Следующая попытка доступна через ${emailSendedTimer} секунд`}
      </Button>
    </>
  );
};

export const UserNotConfirmedInfo = React.memo(UserNotConfirmedInfoComponent);
