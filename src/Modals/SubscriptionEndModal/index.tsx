import React from 'react';
import { Text } from '@/Components/_Common';
import { Modal } from '@/Components';
import { Button } from 'antd';
import { globalHistory } from '@/GlobalHistory';
import { PagesRouting } from '@/Routing';
import { SubscriptionPlanModel } from '@/Models/Contract';
import { PaymentApi } from '@/Api/Payment';
import { ResponseStatus } from '@/Api';
import './styles.scss';

type Props = {
  visible: boolean;
  userSubscriptionPlan: SubscriptionPlanModel;
};

const SubscriptionEnd = ({ visible, userSubscriptionPlan }: Props): React.ReactElement => {
  return (
    <Modal
      title={'Упс, вашу подписку нужно продлить'}
      visible={visible}
      width={690}
      body={
        <Text>
          {`Ваша подписка по тарифу "${userSubscriptionPlan.name}" была приостановлена. Вы можете продлить ее оплатив по кнопке ниже или изменить тариф`}
        </Text>
      }
      buttons={
        <>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              PaymentApi.getLink({ subscription_plan_id: userSubscriptionPlan.id }).then((response) => {
                if (response?.status === ResponseStatus.success) {
                  window.location.href = response.data.payment_url;
                } // if
              });
            }}
          >
            {'Продлить подписку'}
          </Button>
          <Button key="back" onClick={() => globalHistory.push(PagesRouting.Settings.Pricing)}>
            {'Изменить тариф'}
          </Button>
        </>
      }
    />
  );
};

export const SubscriptionEndModal = React.memo(SubscriptionEnd);
