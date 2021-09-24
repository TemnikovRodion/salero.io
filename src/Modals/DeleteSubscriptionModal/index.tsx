import React from 'react';
import { Modal } from '@/Components';
import { Button } from 'antd';
import { Text } from '@/Components/_Common';
import './styles.scss';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const DeleteSubscription = ({ visible, onClose }: Props): React.ReactElement => {
  // TODO: Вызывать в админ панели

  return (
    <Modal
      title={'Удаление подписки пользователя'}
      visible={visible}
      body={<Text>'Это действие удалит подписку у выбранного пользователя, продолжить?'</Text>}
      buttons={
        <>
          <Button key={'cancel'} type={'primary'}>
            Отмена
          </Button>
          <Button key={'submit'} danger>
            Удалить подписку
          </Button>
        </>
      }
      onCancel={onClose}
    />
  );
};

export const DeleteSubscriptionModal = React.memo(DeleteSubscription);
