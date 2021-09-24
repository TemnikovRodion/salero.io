import React from 'react';
import { Col, Row } from 'antd';
import { Text, Title, Tooltip } from '@/Components/_Common';
import { useProductCategories } from '@/Models/Enums';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { analyticSelectors } from '@/Reducer/Analytic/selectors';
import { useMemo } from 'react';
import { analyticStatisticTestData } from '@/Mocks';
import { numberUtils } from '@/Utils';
import './styles.scss';

type Props = {};

const AnalyticStatisticComponent = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const analyticStatisticData = useSelector(analyticSelectors.analyticStatisticData);
  const productCategories = useProductCategories();

  const statisticDataSource = useMemo(() => {
    return isUserStoreConnected ? analyticStatisticData : analyticStatisticTestData;
  }, [analyticStatisticData, isUserStoreConnected]);

  return (
    <Row gutter={[0, 24]} justify={'space-between'} align={'middle'}>
      <Col span={18}>
        <Title level={4}>{'Статистика по товарам'}</Title>
      </Col>

      <Col>
        <Title level={5} color={'red'}>
          {!isUserStoreConnected ? '*данные являются тестовыми' : ''}
          <Tooltip
            title={
              'Распределение товаров по категориям A, B и C. Анализ помогает понять, на каких товарах нужно сосредоточить максимум усилий, а с какими можно вообще перестать работать, чтобы не тратить на них время и деньги.'
            }
          />
        </Title>
      </Col>

      {productCategories.map((item) => {
        const statisticData = statisticDataSource.find((data) => data.productCategory === item.key);

        return (
          <Col key={item.key} span={7}>
            <Title level={2} className={'analytic-statistic-title'}>
              {statisticData?.products_count ?? 0}
              <img src={item.image} alt={item.key} />
              {' - '}
              <span className={'analytic-statistic-sub-title'}>{item.description}</span>
            </Title>

            <Text color={'gray'} className={'analytic-statistic-text'}>
              {`${numberUtils.getRoundedString(statisticData?.assortment_percentage, 1) ?? 0} % — ассортимента;`}
              <br />
              {`${numberUtils.getRoundedString(statisticData?.sales_percentage, 1) ?? 0} % — продаж;`}
            </Text>
          </Col>
        );
      })}
    </Row>
  );
};

export const AnalyticStatistic = React.memo(AnalyticStatisticComponent);
