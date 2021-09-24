import React from 'react';
import { Link, Text, Title } from '@/Components/_Common';
import { PagesRouting } from '@/Routing';
import styles from './styles.scss';

type Props = {};

export const ShopNotConnected = ({}: Props): React.ReactElement => {
  return (
    <>
      <Title level={4}>{'Магазин не подключен'}</Title>

      <div>
        <Text weight={'medium'}>
          {'Подключите магазин '}
          <Link location={PagesRouting.Settings.Integration} color={'blue'} weight={'medium'}>
            {'здесь'}
          </Link>
        </Text>
      </div>
    </>
  );
};
