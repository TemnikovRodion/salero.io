import React from 'react';
import './styles.scss';
import { Text } from '@/Components/_Common';

type Props = {
  step: { title: string; src: string };
};

export const ApiKeyConnection = ({ step }: Props): React.ReactElement => {
  return (
    <>
      <Text>{'После введите Ваш ключ в соседней форме на этой странице и нажмите "Подключить магазин".'}</Text>

      <Text>
        {
          'Если Вы ранее работали с сервисами статистики Wildberries, то по API-ключу статистика будет доступна за последние 90 дней. Если Вы ранее не работали с сервисами статистики Wildberries, то статистика по API-ключу будет доступна c момента создания API-ключа.'
        }
      </Text>

      <img className={'itegration-steps-image'} key={step.title} src={step.src} />
    </>
  );
};
