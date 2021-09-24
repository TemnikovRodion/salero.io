import React, { useMemo } from 'react';
import { Menu } from 'antd';
import { PagesRouting } from '@/Routing';
import {
  InfoCircleOutlined,
  TagOutlined,
  AppstoreOutlined,
  UserOutlined,
  CloudUploadOutlined,
  CodeSandboxOutlined,
  InboxOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { Text } from '@/Components/_Common';
import { globalHistory } from '@/GlobalHistory';
import './styles.scss';

type Props = {
  activeItem: string;
  isMenuShown: boolean;
};

export const AsideMenu = ({ activeItem, isMenuShown }: Props): React.ReactElement => {
  const menuGroups = useMemo(() => {
    const mainGroup = [
      //{ route: PagesRouting.Dashboards.Analytic, title: 'Аналитика', icon: AppstoreOutlined },
      { route: PagesRouting.Dashboards.Products, title: 'Товары', icon: InboxOutlined },
      { route: PagesRouting.Dashboards.Warehouse, title: 'Склад', icon: CodeSandboxOutlined },
      //{ route: PagesRouting.Dashboards.Autodelivery, title: 'Автопоставка', icon: CarOutlined },
      { route: PagesRouting.Dashboards.OrderFeed, title: 'Лента заказов', icon: ShoppingCartOutlined },
      //{ route: PagesRouting.Dashboards.Finances, title: 'Финансы', icon: DollarOutlined },
      //{ route: PagesRouting.Dashboards.Alerts, title: 'Оповещения', icon: BellOutlined },
      { route: PagesRouting.Settings.Integration, title: 'Интеграция', icon: CloudUploadOutlined },
      { route: PagesRouting.Settings.Help, title: 'Помощь', icon: InfoCircleOutlined },
    ];

    const profileGroup = [
      { route: PagesRouting.Settings.Profile, title: 'Личный кабинет', icon: UserOutlined },
      { route: PagesRouting.Settings.Pricing, title: 'Тарифы', icon: TagOutlined },
      //{ route: PagesRouting.Settings.Users, title: 'Все пользователи', icon: AppstoreOutlined }, // TODO: Показывать только админу
    ];

    return [
      { title: 'ОСНОВНОЕ', items: mainGroup },
      { title: 'ПРОФИЛЬ', items: profileGroup },
    ];
  }, []);

  const largeMenu = menuGroups.map((menuGroup, menuGoupIdx) => (
    <Menu.ItemGroup key={menuGoupIdx} title={menuGroup.title}>
      {menuGroup.items.map((item) => (
        <Menu.Item key={item.route} onClick={() => globalHistory.push(item.route)}>
          <div className={'aside-menu-item aside-menu-item-large'}>
            {React.createElement(item.icon, { className: 'aside-menu-item-icon' })}
            <Text weight={'medium'} className={'aside-menu-item-title'}>
              {item.title}
            </Text>
          </div>
        </Menu.Item>
      ))}
    </Menu.ItemGroup>
  ));

  const smallMenu = menuGroups.map((menuGroup) => {
    return menuGroup.items.map((item) => (
      <Menu.Item key={item.route} onClick={() => globalHistory.push(item.route)}>
        <div className={'aside-menu-item aside-menu-item-small'}>
          {React.createElement(item.icon, { className: 'aside-menu-item-icon' })}
        </div>
      </Menu.Item>
    ));
  });

  return (
    <Menu mode="inline" selectedKeys={[activeItem]} openKeys={[activeItem]}>
      {isMenuShown ? largeMenu : smallMenu}
    </Menu>
  );
};
