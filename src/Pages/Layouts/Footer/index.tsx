import React from 'react';
import { Link, Text } from '@/Components/_Common';
import './styles.scss';

type Props = {};

export const Footer = ({}: Props): React.ReactElement => {
  return (
    <footer className="footer">
      <div>
        <Text>{`Copyright © ${new Date().getFullYear()} ${APP_NAME} Все права защищены`}</Text>
      </div>

      <div>
        <Link location={'https://salero.io/agreement'} color={'black'}>
          {'Пользовательское соглашение'}
        </Link>
        <Text color={'gray'} className={'footer-devider'}>
          |
        </Text>
        <Link location={'https://salero.io/privacy'} color={'black'}>
          {'Пользовательское соглашение'}
        </Link>
      </div>
    </footer>
  );
};
