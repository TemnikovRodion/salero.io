import React from 'react';
import { Col, Tabs } from 'antd';
import { Billing, ChangePassword, EditProfile } from './modules';
import './styles.scss';

const ProfileFormsComponent = () => {
  return (
    <Tabs defaultActiveKey="0" className={'profile-forms-tabs'}>
      <Tabs.TabPane key="1" tab="Редактировать профиль" className={'profile-forms-tab'}>
        <Col lg={16}>
          <EditProfile />
        </Col>
      </Tabs.TabPane>

      <Tabs.TabPane key="2" tab="Изменить пароль" className={'profile-forms-tab'}>
        <Col lg={16}>
          <ChangePassword />
        </Col>
      </Tabs.TabPane>

      <Tabs.TabPane key="3" tab="Реквизиты" className={'profile-forms-tab'}>
        <Col lg={16}>
          <Billing />
        </Col>
      </Tabs.TabPane>
    </Tabs>
  );
};

export const ProfileForms = React.memo(ProfileFormsComponent);
