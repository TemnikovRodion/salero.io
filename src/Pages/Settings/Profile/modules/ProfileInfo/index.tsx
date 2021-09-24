import React from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { Badge, Divider } from 'antd';
import { Images } from '@/Static';
import { Link, Text, Title } from '@/Components/_Common';
import { SubscriptionStatus } from '@/Models/Enums';
import { PagesRouting } from '@/Routing';
import moment from 'moment';
import { DateFormats } from '@/Constants/DateFormats';
import './styles.scss';

type Props = {};

const ProfileInfoComponent = ({}: Props) => {
  const user = useSelector(userSelectors.user);
  const userStoreKey = useSelector(userSelectors.userStoreKey);

  const isSubscriptionActive = user?.subscription?.status.code !== SubscriptionStatus.NotPaid;

  return (
    <div className={'profile-info-wrapper'}>
      <img src={Images.Settings.Profile.ProfileLogo} />

      <div className={'profile-info-title-wrapper'}>
        <Title level={3}>
          {user?.first_name || user?.last_name ? `${user?.first_name} ${user?.last_name}` : 'Новый пользователь'}
        </Title>

        <div className={'profile-info-title-shop-status'}>
          <Text color={'gray'}>{userStoreKey ? 'Магазин подключен' : 'Магазин не подключен'}</Text>
          <Badge status={userStoreKey ? 'success' : 'error'} />
        </div>
      </div>

      <div className={'profile-info-subscription-wrapper'}>
        <div className={'profile-item-subscription-group'}>
          <Text weight={'medium'}>{'Подписка'}</Text>
          <Text>{isSubscriptionActive ? 'Активна' : 'Неактивна'}</Text>
        </div>

        <Divider className={'profile-info-subscription-divider'} />

        <div className={'profile-item-subscription-group'}>
          <Text weight={'medium'}>{'Ваш тариф'}</Text>
          <Text>{user?.subscription?.plan.name ?? '-'}</Text>
        </div>

        <Divider className={'profile-info-subscription-divider'} />

        {isSubscriptionActive && (
          <div className={'profile-item-subscription-group'}>
            <Text weight={'medium'}>{user?.subscription?.isRebill ? 'Следующий платёж' : 'Истекает'}</Text>
            <Text>
              {user && user.subscription ? moment(user.subscription.end_date).format(DateFormats.TextDateFormat) : '-'}
            </Text>
          </div>
        )}

        <div className={'profile-info-key-wrapper'}>
          <Text>{'API-ключ: '}</Text>
          <Text className={'profile-info-key'}>{userStoreKey ?? 'Не подключен'}</Text>
        </div>
      </div>

      <div className={'profile-info-pricing-wrapper'}>
        <Link location={PagesRouting.Settings.Pricing} color={'blue'}>
          {'Изменить тариф'}
        </Link>
      </div>
    </div>
  );
};

export const ProfileInfo = React.memo(ProfileInfoComponent);
