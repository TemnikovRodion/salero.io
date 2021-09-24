import React from 'react';
import { Text, Title } from '@/Components/_Common';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { stringUtils } from '@/Utils';
import styles from './styles.scss';

type Props = {};

export const TariffPaidInfo = ({}: Props): React.ReactElement => {
  const userSubscription = useSelector(userSelectors.userSubscription);
  const subscriptionRemainingDays = userSubscription ? moment(userSubscription.end_date).diff(moment(), 'days') : 0;

  return (
    <>
      <Title level={4}>{`Ваш тариф: ${userSubscription?.plan.name}`}</Title>
      <Text weight={'medium'}>{`Осталось: ${stringUtils.getFormattedDay(subscriptionRemainingDays + 1)}`}</Text>
    </>
  );
};
