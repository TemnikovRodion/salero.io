import React from 'react';
import { Tabs } from 'antd';
import { ContentWrapper, DashboardTitle } from '@/Components';
import { AlertsSetting, AlertsTable } from './modules';
import './styles.scss';

const Alerts = (): React.ReactElement => {
  return (
    <ContentWrapper>
      <DashboardTitle
        title={'Оповещения'}
        text={'Здесь вы можете смотреть и настраивать оповещения, сформированные по вашему фильтру.'}
      />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Обзор" key="1">
          <AlertsTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Настроить оповещения" key="2">
          <AlertsSetting />
        </Tabs.TabPane>
      </Tabs>
    </ContentWrapper>
  );
};

export default Alerts;
