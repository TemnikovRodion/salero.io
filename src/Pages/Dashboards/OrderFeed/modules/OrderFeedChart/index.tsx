import React, { useMemo, useState } from 'react';
import { Square, Text, Title } from '@/Components/_Common';
import { useOrderFeedChartUnits, useOrderTypes } from '@/Models/Enums';
import { DataChart } from '@/Components';
import { Col, Radio, Row } from 'antd';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { orderFeedSelectors } from '@/Reducer/OrderFeed/selectors';
import { orderFeedChartTestData } from '@/Mocks';
import './styles.scss';

type Props = {};

const OrderFeedChartComponent = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const orderFeedChartData = useSelector(orderFeedSelectors.orderFeedChartData);
  const orderFeedChartUnits = useOrderFeedChartUnits();
  const orderTypes = useOrderTypes();

  // Фильтры графика
  const [selectedChartUnit, setSelectedChartUnit] = useState(orderFeedChartUnits[0].key);

  // Данные для графика
  // Если не подключен магазин - отдаем тестовые данные
  const chartDataSource = useMemo(() => {
    return isUserStoreConnected ? orderFeedChartData : orderFeedChartTestData;
  }, [orderFeedChartData, isUserStoreConnected]);

  return (
    <Row gutter={[0, 20]} justify={'space-between'} align={'middle'}>
      <Col span={24}>
        <Title level={4}>{'Динамика продаж движения товаров'}</Title>
      </Col>

      <Col span={12}>
        <Radio.Group value={selectedChartUnit}>
          {orderFeedChartUnits.map((item) => (
            <Radio.Button
              key={item.key}
              disabled={false}
              value={item.key}
              onChange={(e) => {
                setSelectedChartUnit(e.target.value);
              }}
            >
              {item.value}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Col>

      <Col>
        <Row gutter={[10, 0]}>
          <Col>
            <Row justify="center" align="middle">
              <Square color={'orange'} />
              <Text>Заказы</Text>
            </Row>
          </Col>

          <Col>
            <Row justify="center" align="middle">
              <Square color={'blue'} />
              <Text>Продажи</Text>
            </Row>
          </Col>

          <Col>
            <Row justify="center" align="middle">
              <Square color={'green'} />
              <Text>Возвраты</Text>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <DataChart
          type={'bar'}
          series={
            chartDataSource
              .find((item) => item.chart_unit === selectedChartUnit)
              ?.chart_data.map((item) => ({
                ...item,
                name: orderTypes.find((type) => item.name === type.key)?.value ?? item.name,
              })) ?? []
          }
          colors={['orange', 'blue', 'green']}
        />
      </Col>
    </Row>
  );
};

export const OrderFeedChart = React.memo(OrderFeedChartComponent);
