import React from 'react';
import { Divider } from 'antd';
import { AsideHelp, AsideMenu, AsidePricing } from './modules';
import { globalHistory } from '@/GlobalHistory';
import './styles.scss';

type Props = {
  isMenuShown: boolean;
};

export const Aside = ({ isMenuShown }: Props): React.ReactElement => {
  return (
    <aside className={`aside ${!isMenuShown ? 'aside-small' : ''}`}>
      <AsideMenu activeItem={globalHistory.location.pathname} isMenuShown={isMenuShown} />

      {isMenuShown && (
        <div className={'aside-info'}>
          <AsideHelp />
          <Divider />
          <AsidePricing />
        </div>
      )}
    </aside>
  );
};
