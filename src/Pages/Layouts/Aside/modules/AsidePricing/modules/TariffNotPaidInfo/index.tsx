import React from 'react';
import { Link, Text, Title } from '@/Components/_Common';
import { PagesRouting } from '@/Routing';
import styles from './styles.scss';

type Props = {};

export const TariffNotPaidInfo = ({}: Props): React.ReactElement => {
  return (
    <>
      <Title level={4}>{'Подписка не оплачена'}</Title>

      <div>
        <Text weight={'medium'}>
          {'Получите тестовый период или '}
          <Link location={PagesRouting.Settings.Pricing} color={'blue'} weight={'medium'}>
            {'оплатите подписку'}
          </Link>
        </Text>
      </div>
    </>
  );
};
