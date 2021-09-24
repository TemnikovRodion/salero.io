import React from 'react';
import './styles.scss';
import { Text, Link } from '@/Components/_Common';

type Props = {
  step: { title: string; src: string };
};

export const ApiKeyGeneration = ({ step }: Props): React.ReactElement => {
  return (
    <>
      <Text>{'Нажмите на кнопку “Сгенерировать ключи”.'}</Text>
      <Text>
        {
          'Сформированный API-ключ будет отображаться в Вашем личном кабинете в разделе «Настройки» -> “Доступ к API” по ссылке '
        }
        <Link location={'https://suppliers-portal.wildberries.ru/access-to-api'} target={'_blank'} color={'blue'}>
          {'https://suppliers-portal.wildberries.ru/access-to-api'}
        </Link>
      </Text>

      <img className={'itegration-steps-image'} key={step.title} src={step.src} />
    </>
  );
};
