import React from 'react';
import { Col, Row } from 'antd';
import { Images } from '@/Static';
import { Text } from '../_Common';
import './styles.scss';

type Props = {
  text: string;
};

export const NoDataBlock = ({ text }: Props): React.ReactElement => {
  return (
    <Row gutter={[0, 24]} justify={'center'} className={'no-data-block'}>
      <Col span={24}>
        <Row justify={'center'}>
          <img width={118} height={102} src={Images.Other.NoData} />
        </Row>
      </Col>

      <Col span={24}>
        <Row justify={'center'}>
          <Text className={'no-data-block-text'}>
            {'Нет данных'}
            <br />
            {text}
          </Text>
        </Row>
      </Col>
    </Row>
  );
};
