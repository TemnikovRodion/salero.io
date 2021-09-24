import React from 'react';
import { Title, Text, Link } from '@/Components/_Common';
import { PagesRouting } from '@/Routing';
import './styles.scss';

type Props = {};

export const AsideHelp = ({}: Props): React.ReactElement => {
  return (
    <div className={'aside-help'}>
      <Title level={4} className={'aside-help-title'}>
        {'Есть вопрос?'}
      </Title>

      <div>
        <Text weight={'medium'}>
          {'Найдите ответ на свой вопрос в разделе '}
          <Link location={PagesRouting.Settings.Help} color={'blue'} weight={'medium'}>
            {'помощь'}
          </Link>
          {' или напишите в наш '}
          <Link location={'https://t.me/salerosupport'} color={'blue'} target={'_blank'} weight={'medium'}>
            {'телеграм-чат'}
          </Link>
        </Text>
      </div>
    </div>
  );
};
