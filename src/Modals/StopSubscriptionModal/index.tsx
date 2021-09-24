import React from 'react';
import { Text } from '@/Components/_Common';
import { Modal } from '@/Components';
import { Button } from 'antd';
import './styles.scss';

type Props = {
  visible: boolean;
  subscriptionEndDate: string;
  onClose: () => void;
};

const StopSubscription = ({ visible, subscriptionEndDate, onClose }: Props): React.ReactElement => {
  // TODO: Уточнить нужна ли модалка

  return (
    <Modal
      title={'Вы уверены что хотите остановить подписку?'}
      visible={visible}
      width={690}
      body={
        <Text>
          {`При остановке подписки доступ к вашему кабинету сохранится до ${subscriptionEndDate} и после вы потеряете многие функции вашего личного кабинета. Вы уверены что хотите остановить подписку?`}
        </Text>
      }
      buttons={
        <>
          <Button key="back" type="primary" onClick={() => console.log('Остановил подписку')}>
            {'Отмена'}
          </Button>
          <Button key="submit" danger={true} onClick={onClose}>
            {'Остановить подписку'}
          </Button>
        </>
      }
    />
  );
};

export const StopSubscriptionModal = React.memo(StopSubscription);
