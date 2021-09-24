import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Reducer/Store';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { Text, Title } from '@/Components/_Common';
import { BaseResponse } from '@/Api';
import './styles.scss';

type Props = {
  email_token: string;
};

const EmailTokenInfoComponent = ({ email_token }: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const [emailTokenInfo, setEmailTokenInfo] = useState<{ checked: boolean; valid: boolean }>({
    checked: false,
    valid: false,
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(userAsyncActions.confirmEmail({ email_token: email_token })).then((response) => {
        if ((response.payload as BaseResponse<void>)?.status) {
          setEmailTokenInfo({ checked: true, valid: true });
        } else {
          setEmailTokenInfo({ checked: true, valid: false });
        } // if
      });
    }, 1000);
  }, []);

  const getInfoText = () => {
    if (emailTokenInfo.checked && !emailTokenInfo.valid) {
      return {
        title: 'Ошибка подтверждения почты!',
        text: 'Что-то пошло не так... Попробуйте подтвердить почту позже!',
      };
    } // if

    if (emailTokenInfo.checked && emailTokenInfo.valid) {
      return {
        title: 'Ваш почтовый адрес подтвержден!',
        text: 'Теперь вы можете зайти в свой аккаунт (сейчас мы сделаем это автоматически).',
      };
    } // if

    return {
      title: 'Проверяем Вашу ссылку!',
      text: 'Подождите несколько секунд...',
    };
  };

  return (
    <>
      <Title level={1}>{getInfoText().title}</Title>
      <Text>{getInfoText().text}</Text>
    </>
  );
};

export const EmailTokenInfo = React.memo(EmailTokenInfoComponent);
