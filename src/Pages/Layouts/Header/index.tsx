import React from 'react';
import { Layout } from 'antd';
import { HeaderAlerts, HeaderLogo, HeaderAsideMenu, HeaderUserMenu } from './modules';
import './styles.scss';

type Props = {
  isMenuShown: boolean;
  onAsideMenuButtonClick: () => void;
};

export const Header = ({ isMenuShown, onAsideMenuButtonClick }: Props): React.ReactElement => {
  return (
    <Layout.Header className={'header'} id={'header'}>
      <div className={'header-nav-left'}>
        <HeaderLogo isMenuShown={isMenuShown} />
        <HeaderAsideMenu isMenuShown={isMenuShown} onAsideMenuButtonClick={onAsideMenuButtonClick} />
      </div>

      <div className={'header-nav-right'}>
        {/* TODO: Подключить обратно <HeaderAlerts />*/}
        <HeaderUserMenu />
      </div>
    </Layout.Header>
  );
};
