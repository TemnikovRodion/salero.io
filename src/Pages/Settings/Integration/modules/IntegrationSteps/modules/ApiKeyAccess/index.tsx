import React from 'react';
import './styles.scss';
import { Text } from '@/Components/_Common';

type Props = {
  step: { title: string; src: string };
};

export const ApiKeyAccess = ({ step }: Props): React.ReactElement => {
  return (
    <>
      <Text>
        {
          'Для аналитики ваших продаж на Wildberries необходимо подключить ваш кабинет поставщика по API-ключу. Если у вас уже API-ключ, переходите на этап 3.'
        }
      </Text>

      <Text>{'Если его нет, то выберите в левом меню “Настройки” -> “Доступ к API”'}</Text>

      <img className={'itegration-steps-image'} key={step.title} src={step.src} />
    </>
  );
};
