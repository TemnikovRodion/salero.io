import React from 'react';
import { Text } from '@/Components/_Common';
import { Modal } from '@/Components';
import { Button } from 'antd';
import { globalHistory } from '@/GlobalHistory';
import { PagesRouting } from '@/Routing';
import './styles.scss';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const StoreConnection = ({ visible, onClose }: Props): React.ReactElement => {
  return (
    <Modal
      title={'Похоже, самое время подключить ваш магазин!'}
      visible={visible}
      width={754}
      onCancel={onClose}
      body={
        <Text>
          {
            'Поздравляем с регистрацией в Salero! Чтобы получить бесплатный 7-дневный пробный период, подключите ваш магазин. Вы можете это сделать во вкладке Интеграция'
          }
        </Text>
      }
      buttons={
        <>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              globalHistory.push(PagesRouting.Settings.Integration);
              onClose();
            }}
          >
            {'Интеграция'}
          </Button>
          <Button key="back" onClick={onClose}>
            {'Ок'}
          </Button>
        </>
      }
    />
  );
};

export const StoreConnectionModal = React.memo(StoreConnection);
