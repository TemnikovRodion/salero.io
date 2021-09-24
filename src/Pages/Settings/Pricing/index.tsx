import React from 'react';
import { Card } from 'antd';
import { Title } from '@/Components/_Common';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { PricingInfo, PricingPlans } from './modules';
import { ContentWrapper } from '@/Components';
import './styles.scss';

type Props = {};

const PricingComponent = ({}: Props): React.ReactElement => {
  return (
    <ContentWrapper>
      <Card>
        <div className={'pricing-header-wrapper'}>
          <Title level={2}>{'Тариф и статус подписки'}</Title>
          <PricingInfo />
        </div>

        <div className={'pricing-body-wrapper'}>
          <PricingPlans />
        </div>
      </Card>
    </ContentWrapper>
  );
};

const Pricing = React.memo(PricingComponent);

export default Pricing;
