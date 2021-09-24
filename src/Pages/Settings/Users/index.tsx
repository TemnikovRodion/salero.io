import React from 'react';
import { ContentWrapper, DateRangePicker } from '@/Components';
import { Card, Col, Row } from 'antd';
import { UsersSummary, UsersTable } from './model';
import './styles.scss';

type Props = {};

const Users = ({}: Props): React.ReactElement => {
  return (
    <ContentWrapper>
      <Card>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <DateRangePicker title={'Статистика за'} onChange={(value) => console.log(value)} />
          </Col>

          <Col span={24}>
            <UsersSummary />
          </Col>
        </Row>
      </Card>

      <Card>
        <UsersTable />
      </Card>
    </ContentWrapper>
  );
};

export default Users;
