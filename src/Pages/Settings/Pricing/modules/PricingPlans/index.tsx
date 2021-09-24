import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { Text, Title } from '@/Components/_Common';
import { SubscriptionStatus } from '@/Models/Enums';
import { Svg } from '@/Static';
import { PaymentModal } from '@/Modals';
import { useDispatch, useSelector } from 'react-redux';
import { subscriptionPlansSelectors } from '@/Reducer/SubscriptionPlans/selectors';
import { subscriptionPlansAsyncActions } from '@/Reducer/SubscriptionPlans/reducer';
import { userSelectors } from '@/Reducer/User/selectors';
import './styles.scss';

type Props = {};

const PricingPlansComponent = ({}: Props): React.ReactElement => {
  const dispatch = useDispatch();
  const userSubscription = useSelector(userSelectors.userSubscription);
  const subscriptionPlans = useSelector(subscriptionPlansSelectors.subscriptionPlans);

  useEffect(() => {
    if (subscriptionPlans.length === 0) {
      dispatch(subscriptionPlansAsyncActions.get());
    } // if
  }, []);

  const [paymentModal, setPaymentModal] = useState<{ needShowModal: boolean; subscriptionPlanId?: number }>({
    needShowModal: false,
  });

  return (
    <>
      <PaymentModal
        visible={paymentModal.needShowModal}
        subscriptionPlanId={paymentModal.subscriptionPlanId}
        onClose={() => setPaymentModal({ needShowModal: false })}
      />

      <Row justify={'space-around'}>
        {subscriptionPlans.map((subscriptionPlan) => {
          const isCurrentSubscriptionPlan =
            userSubscription?.plan.id === subscriptionPlan.id &&
            userSubscription.status.code === SubscriptionStatus.Paid;

          return (
            <Col key={subscriptionPlan.id} lg={8} xxl={6}>
              <div className="pricing-plan-item">
                <div className={'pricing-plan-item-title'}>
                  <Title level={2}>{`Тариф "${subscriptionPlan.name}"`}</Title>
                  <Text>{subscriptionPlan.description}</Text>
                </div>

                <div className={'pricing-plan-item-price'}>{subscriptionPlan.price} ₽</div>

                <div className={'pricing-plan-item-features'}>
                  {subscriptionPlan.features.map((feature) => (
                    <div key={feature.id} className={'pricing-plan-item-feature'}>
                      <img src={Svg.Checkmark} />
                      <Text>{feature.name}</Text>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setPaymentModal({ needShowModal: true, subscriptionPlanId: subscriptionPlan.id })}
                  disabled={isCurrentSubscriptionPlan}
                  className={'pricing-plan-item-button'}
                  type="primary"
                >
                  {isCurrentSubscriptionPlan ? 'Вы уже подписаны на тариф' : 'Подключиться'}
                </Button>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export const PricingPlans = React.memo(PricingPlansComponent);
