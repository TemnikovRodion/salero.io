import React from 'react';
import { ShopNotConnected, TariffPaidInfo, TariffNotPaidInfo, TariffTrialInfo } from './modules';
import { SubscriptionStatus } from '@/Models/Enums';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { UserModel } from '@/Models/Contract';
import './styles.scss';

type Props = {};

export const AsidePricing = ({}: Props): React.ReactElement => {
  const userSubscription = useSelector(userSelectors.userSubscription);
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);

  const getMessage = (): JSX.Element => {
    if (!isUserStoreConnected) return <ShopNotConnected />;

    switch (userSubscription?.status.code) {
      case SubscriptionStatus.Trial:
        return <TariffTrialInfo />;

      case SubscriptionStatus.Paid:
        return <TariffPaidInfo />;

      default:
        return <TariffNotPaidInfo />;
    }
  };

  return <div className={'aside-pricing'}>{getMessage()}</div>;
};
