import React from 'react';
import { Link, Text, Title } from '@/Components/_Common';
import { PagesRouting } from '@/Routing';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import moment from 'moment';
import styles from './styles.scss';
import { stringUtils } from '@/Utils';

type Props = {};

export const TariffTrialInfo = ({}: Props): React.ReactElement => {
  const userSubscription = useSelector(userSelectors.userSubscription);
  const subscriptionRemainingDays = userSubscription ? moment(userSubscription.end_date).diff(moment(), 'days') : 0;

  return (
    <>
      <Title level={4}>{'У вас пробный период'}</Title>

      <div>
        <Text weight={'medium'}>
          {`Осталось ${stringUtils.getFormattedDay(subscriptionRemainingDays + 1)}, `}
          <Link location={PagesRouting.Settings.Pricing} color={'blue'} weight={'medium'}>
            {'оплатите подписку'}
          </Link>
        </Text>
      </div>
    </>
  );
};
