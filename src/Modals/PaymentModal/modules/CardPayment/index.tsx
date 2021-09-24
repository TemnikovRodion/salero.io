import React, { useState } from 'react';
import { Link, Text } from '@/Components/_Common';
import { Button, Checkbox } from 'antd';
import ym from 'react-yandex-metrika';
import TagManager from 'react-gtm-module';
import { PaymentApi } from '@/Api/Payment';
import { ResponseStatus } from '@/Api';
import './styles.scss';

type Props = {
  subscriptionPlanId: number;
};

export const CardPayment = ({ subscriptionPlanId }: Props): React.ReactElement => {
  const [isAgree, setIsAgree] = useState(false);

  return (
    <div className={'card-payment-wrapper'}>
      <Text>
        {'Перед оформлением подписки, пожалуйста, ознакомьтесь с Пользовательским соглашением по '}
        <Link
          location={'https://docs.google.com/document/d/1yLDpfa9mBQjKoA4guR-0nvGOGM2o7P8-ST-GN24tqPE/edit?usp=sharing'}
          target={'_blank'}
          color={'blue'}
        >
          {'ссылке:'}
        </Link>
      </Text>

      <Checkbox checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)}>
        <Text>{'Я соглашаюсь с правилами сервиса'}</Text>
      </Checkbox>

      <Button
        type={'primary'}
        disabled={!isAgree}
        onClick={() => {
          ym(String(YM_ACCOUNT), 'reachGoal', 'pressBtnPayPlan');
          TagManager.dataLayer({
            dataLayer: {
              gtmId: GA_ACCOUNT,
              page: 'pricing',
            },
            dataLayerName: 'PageDataLayer',
          });

          PaymentApi.getLink({ subscription_plan_id: subscriptionPlanId }).then((response) => {
            if (response?.status === ResponseStatus.success) {
              window.location.href = response.data.payment_url;
            } // if
          });
        }}
      >
        Оплатить
      </Button>
    </div>
  );
};
