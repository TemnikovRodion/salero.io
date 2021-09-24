import React from 'react';
import { Text, Title } from '@/Components/_Common';
import { EllipsisDropdown } from '@/Components';
import { CloseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { SubscriptionStatus } from '@/Models/Enums';
import moment from 'moment';
import { DateFormats } from '@/Constants/DateFormats';
import './styles.scss';

type Props = {};

const PricingInfoComponent = ({}: Props): React.ReactElement => {
  const userSubscription = useSelector(userSelectors.userSubscription);

  const getPricingInfoText = () => {
    const pricingInfoText = {
      title: '',
      text: '',
    };

    if (userSubscription) {
      switch (userSubscription.status.code) {
        case SubscriptionStatus.Trial:
          pricingInfoText.title = 'Триал';
          pricingInfoText.text = 'бесплатный 7-дневный период';
          break;

        case SubscriptionStatus.Paid:
          pricingInfoText.title = 'Подписка активна';
          pricingInfoText.text =
            (userSubscription.isRebill ? 'Следующий платеж ' : 'Истекает ') +
            moment(userSubscription.end_date).format(DateFormats.TextDateFormat);
          break;

        case SubscriptionStatus.NotPaid:
          pricingInfoText.title = 'Подписка отключена';
          break;
      } // switch
    } // if

    return pricingInfoText;
  }; // getPricingInfoText

  return (
    <div className={'pricing-info-wrapper'}>
      <div className={'pricing-info-text'}>
        <Title level={4}>{getPricingInfoText().title}</Title>
        <Text color={'gray'}>{getPricingInfoText().text}</Text>
      </div>

      {userSubscription?.status.code === SubscriptionStatus.Paid && (
        <EllipsisDropdown
          placement={'bottomLeft'}
          menu={
            <Menu className="dropdown">
              <Menu.Item key="0" onClick={() => console.log('Показал модалку отписки')}>
                <div className={'pricing-info-subscription-stop'}>
                  <CloseOutlined />
                  <span className={'pricing-info-subscription-stop-text'}>{'Остановить подписку'}</span>
                </div>
              </Menu.Item>
            </Menu>
          }
        />
      )}
    </div>
  );
};

export const PricingInfo = React.memo(PricingInfoComponent);
