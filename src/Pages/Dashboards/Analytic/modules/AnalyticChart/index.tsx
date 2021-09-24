import React, { useMemo, useState } from 'react';
import { DataChart, DateRangePicker, ProductCategoriesGroup } from '@/Components';
import { Col, Radio, Row } from 'antd';
import { Title } from '@/Components/_Common';
import { ProductCategory, useAnalyticChartUnits } from '@/Models/Enums';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { analyticSelectors } from '@/Reducer/Analytic/selectors';
import { analyticChartTestData } from '@/Mocks';
import './styles.scss';

type Props = {};

const AnalyticChartComponent = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const analyticChartData = useSelector(analyticSelectors.analyticChartData);
  const analyticChartUnits = useAnalyticChartUnits();

  // Фильтры графика
  const [selectedChartUnit, setSelectedChartUnit] = useState(analyticChartUnits[0].key);
  const [selectedProductCategories, setSelectedProductCategories] = useState<ProductCategory[]>([]);

  // Данные для шрафика
  // Если не подключен магазин - отдаем тестовые данные
  const chartDataSource = useMemo(() => {
    return isUserStoreConnected ? analyticChartData : analyticChartTestData;
  }, [analyticChartData, isUserStoreConnected]);

  return (
    <Row gutter={[0, 24]} justify={'space-between'} align={'middle'}>
      <Col span={16}>
        <DateRangePicker
          title={'Динамика продаж за'}
          disabled={!isUserStoreConnected}
          onChange={(value) => console.log(value, 'поменял дату')}
        />
      </Col>

      <Col>
        {/* Добавить проверку ключа юзера */}
        <Title level={5} color={'red'}>
          {'*данные являются тестовыми'}
        </Title>
      </Col>

      <Col span={11}>
        <Radio.Group value={selectedChartUnit}>
          {analyticChartUnits.map((item) => (
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
        <ProductCategoriesGroup onChange={(values) => setSelectedProductCategories(values)} needSelectAll />
      </Col>

      <Col span={24}>
        <DataChart
          type={'line'}
          series={
            chartDataSource
              .find((item) => item.chartUnit === selectedChartUnit)
              ?.chartData.map((item) =>
                selectedProductCategories.includes(item.name as ProductCategory) ? item : { ...item, data: [] },
              ) ?? []
          }
          colors={['green', 'orange', 'red']}
        />
      </Col>
    </Row>
  );
};

export const AnalyticChart = React.memo(AnalyticChartComponent);
