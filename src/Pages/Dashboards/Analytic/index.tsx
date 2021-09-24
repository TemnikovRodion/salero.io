import React from 'react';
import { ContentWrapper } from '@/Components';
import { AnalyticChart, AnalyticStatistic, AnalyticSummary, AnalyticTable } from './modules';
import { Card, Col, Row } from 'antd';
import './styles.scss';

type Props = {};

const Analytic = ({}: Props): React.ReactElement => {
  return (
    <ContentWrapper>
      <Row gutter={[24, 0]}>
        <Col span={18}>
          <Card>
            <AnalyticChart />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <AnalyticSummary />
          </Card>
        </Col>
      </Row>

      <Card>
        <AnalyticStatistic />
      </Card>

      <Card>
        <AnalyticTable />
      </Card>
    </ContentWrapper>
  );
};

export default Analytic;
