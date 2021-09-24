import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './styles.scss';

type Props = {
  isMenuShown: boolean;
  onAsideMenuButtonClick: () => void;
};

export const HeaderAsideMenu = ({ isMenuShown, onAsideMenuButtonClick }: Props): React.ReactElement => {
  return (
    <div className={'header-aside-menu'}>
      {isMenuShown ? (
        <MenuFoldOutlined onClick={onAsideMenuButtonClick} className={'header-aside-menu-icon'} />
      ) : (
        <MenuUnfoldOutlined onClick={onAsideMenuButtonClick} className={'header-aside-menu-icon'} />
      )}
    </div>
  );
};
