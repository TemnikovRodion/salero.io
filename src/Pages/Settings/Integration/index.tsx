import React from 'react';
import './styles.scss';
import { Row } from 'antd';
import { IntegrationSteps, StoreIntegration } from './modules';
import { ContentWrapper } from '@/Components';

type Props = {};

const Integration = ({}: Props): React.ReactElement => {
  return (
    <ContentWrapper>
      <Row>
        <IntegrationSteps />
        <StoreIntegration />
      </Row>
    </ContentWrapper>
  );
};

export default Integration;
