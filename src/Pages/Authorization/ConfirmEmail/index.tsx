import React from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { EmailTokenInfo, UserNotConfirmedInfo } from './modules';
import { Title } from '@/Components/_Common';
import './styles.scss';

type Props = {};

const ConfirmEmailComponent = ({}: Props): React.ReactElement => {
  const user = useSelector(userSelectors.user);
  const email_token = window.location.href.split('?')[1];

  return (
    <div className={'confirm-email'}>
      {email_token && <EmailTokenInfo email_token={email_token} />}
      {user && !email_token && <UserNotConfirmedInfo user={user} />}
      {!user && !email_token && <Title level={1}>{'Что-то пошло не так...'}</Title>}
    </div>
  );
};

export const ConfirmEmail = React.memo(ConfirmEmailComponent);
