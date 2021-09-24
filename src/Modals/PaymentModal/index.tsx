import React from 'react';
import { Tabs } from 'antd';
import { Modal } from '@/Components';
import { CardPayment, RequisitesPayment } from './modules';
import './styles.scss';

type Props = {
  visible: boolean;
  subscriptionPlanId?: number;
  onClose: () => void;
};

export const Payment = ({ visible, subscriptionPlanId, onClose }: Props): React.ReactElement => {
  const { TabPane } = Tabs;

  return (
    <Modal
      title={'Выберите способ оплаты'}
      visible={visible}
      width={776}
      onCancel={onClose}
      body={
        <Tabs>
          {subscriptionPlanId && (
            <TabPane tab="Оплата картой" key="1">
              <CardPayment subscriptionPlanId={subscriptionPlanId} />
            </TabPane>
          )}

          <TabPane tab="Оплата по реквизитам" key="2">
            <RequisitesPayment />
          </TabPane>
        </Tabs>
      }
    />
  );
};

export const PaymentModal = React.memo(Payment);
