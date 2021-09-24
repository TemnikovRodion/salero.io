import React from 'react';
import './styles.scss';
import { Button, Input } from 'antd';
import { Modal } from '@/Components';
import { Text } from '@/Components/_Common';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const GetSubscription = ({ visible, onClose }: Props): React.ReactElement => {
  return (
    <Modal
      title="Выдача подписки"
      visible={visible}
      body={
        <div className={'modal-get-subscription'}>
          <Text>{'Введите количество дней подписки пользователя'}</Text>
          <Input type="number" min={0} placeholder="Введите количество дней" />
        </div>
      }
      buttons={<Button type={'primary'}>Выдать подписку</Button>}
      onCancel={onClose}
    />
  );
};

export const GetSubscriptionModal = React.memo(GetSubscription);
