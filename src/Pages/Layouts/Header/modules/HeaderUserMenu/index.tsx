import React, { useMemo, useState } from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { Svg } from '@/Static';
import { Text } from '@/Components/_Common';
import { useDispatch, useSelector } from 'react-redux';
import { userAsyncActions } from '@/Reducer/User/reducer';
import { AppDispatch } from '@/Reducer/Store';
import { userSelectors } from '@/Reducer/User/selectors';
import { PagesRouting } from '@/Routing';
import { globalHistory } from '@/GlobalHistory';
import './styles.scss';

export const HeaderUserMenu = (): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector(userSelectors.user);

  const onLogoutClick = () => {
    dispatch(userAsyncActions.logout());
  };

  const menuItems = useMemo(() => {
    return [
      {
        title: 'Личный кабинет',
        path: PagesRouting.Settings.Profile,
      },
      {
        title: 'Тарифы',
        path: PagesRouting.Settings.Pricing,
      },
    ];
  }, []);

  const dropdownMenuItems = (
    <div className={'header-user-menu'}>
      <div className={'header-user-menu-title'}>
        <Text color={'gray'}>{user?.email ?? ''}</Text>
      </div>

      <div className="header-user-menu-body">
        <Menu>
          {menuItems.map((menuItem, idx) => {
            return (
              <Menu.Item
                key={idx}
                onClick={() => {
                  globalHistory.push(menuItem.path);
                }}
              >
                <Text>{menuItem.title}</Text>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItems.length} className={'header-user-menu-body-item'} onClick={(e) => onLogoutClick()}>
            <Text color={'red'}>{'Выйти из аккаунта'}</Text>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );

  return (
    <Dropdown trigger={['click']} arrow={true} placement="bottomRight" overlay={dropdownMenuItems}>
      <div className={'header-user-info'}>
        <Avatar className={'header-user-info-avatar'}>{user?.first_name ? user.first_name[0] : 'Н'}</Avatar>
        <Text weight={'medium'} className={'header-user-info-name'}>
          {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : 'Новый пользователь'}
        </Text>
        <img src={Svg.Angle} />
      </div>
    </Dropdown>
  );
};
