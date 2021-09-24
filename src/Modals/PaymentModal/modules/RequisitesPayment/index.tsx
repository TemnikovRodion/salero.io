import { Text } from '@/Components/_Common';
import React from 'react';
import './styles.scss';

type Props = {};

export const RequisitesPayment = ({}: Props): React.ReactElement => {
  return (
    <div>
      <Text>
        Вы можете оплатить любой вид подписки по следующим реквизитам:
        <br />
        Реквизиты счета:
        <br />
        р/с: 40802810700001834099
        <br />
        Банк: АО "ТИНЬКОФФ БАНК" , г. Москва
        <br />
        к/с: 30101810145250000974
        <br />
        БИК: 044525974
        <br />
      </Text>
    </div>
  );
};
