import React, { useMemo } from 'react';
import { Square, Text, Title } from '@/Components/_Common';
import { DataChart } from '@/Components';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { financesSelectors } from '@/Reducer/Finances/selectors';
import { userSelectors } from '@/Reducer/User/selectors';
import { financesChartTestData } from '@/Mocks/finances/FinancesChartTestData';
import './styles.scss';

type Props = {};

export const FinancesChart = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const financesChartData = useSelector(financesSelectors.financesChartData);

  // Данные для графика
  // Если не подключен магазин - отдаем тестовые данные
  const chartDataSource = useMemo(() => {
    return isUserStoreConnected ? financesChartData : financesChartTestData;
  }, [financesChartData, isUserStoreConnected]);

  return (
    <Row gutter={[0, 20]} justify={'space-between'} align={'middle'}>
      <Col span={24}>
        <Title level={4}>{'График сумм по заказам, продажам и валовой прибыли'}</Title>
      </Col>

      <Col span={12}>
        <Text>{'Наведите на график чтобы увидеть подробнее'}</Text>
      </Col>

      <Col>
        <Row gutter={[10, 0]}>
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

          <Col>
            <Row justify="center" align="middle">
              <Square color={'orange'} />
              <Text>Валовая прибыль</Text>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <DataChart series={chartDataSource?.chartData ?? []} type={'line'} colors={['blue', 'green', 'orange']} />
      </Col>
    </Row>
  );
};
