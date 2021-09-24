import React, { useMemo } from 'react';
import { Col, Row } from 'antd';
import { Text, Title } from '@/Components/_Common';
import { useSelector } from 'react-redux';
import { warehousesSelectors } from '@/Reducer/Warehouses/selectors';
import { userSelectors } from '@/Reducer/User/selectors';
import { warehousesTestSummaryData } from '@/Mocks';
import { numberUtils } from '@/Utils';
import './styles.scss';

type Props = {};

const WarehouseSummaryComponent = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const warehousesSummaryData = useSelector(warehousesSelectors.warehousesSummaryData);

  const warehouseStatisticInfo = useMemo(() => {
    const summaryDataSource = isUserStoreConnected ? warehousesSummaryData : warehousesTestSummaryData;

    return [
      {
        title: 'Всего товаров',
        text: summaryDataSource?.total_products ?? '-',
        subText: `${summaryDataSource?.sku ?? '0'} уникальных товаров`,
      },
      {
        title: 'На складе шт.',
        text: summaryDataSource?.in_warehouse ?? '-',
        subText: `${summaryDataSource?.sku_ended ?? 0} закончилось`,
      },
      {
        title: 'Выручка',
        text: `${numberUtils.getMoneyString(summaryDataSource?.revenue)}`,
        subText: `${numberUtils.getMoneyString(summaryDataSource?.balance_cost ?? 0)} стоимость остатков`,
      },
      {
        title: 'В пути к клиенту',
        text: summaryDataSource?.in_way_to_client ?? '-',
        subText: `${summaryDataSource?.in_way_from_client ?? 0} в пути от клиента`,
      },
      {
        title: 'Процент выкупа',
        text: summaryDataSource?.redemption_percentage
          ? `${numberUtils.getRoundedString(summaryDataSource.redemption_percentage, 0) + ' %'}`
          : '-',
        subText: `${numberUtils.getRoundedString(summaryDataSource?.turnover ?? 0, 0)} оборачиваемость`,
      },
    ];
  }, [warehousesSummaryData, isUserStoreConnected]);

  return (
    <Row justify={'space-between'} className={'warehouse-dashboard-statistic'}>
      {warehouseStatisticInfo.map((info, idx) => (
        <Col key={idx} span={4}>
          <Row>
            <Title weight={'bold'} level={5}>
              {info.title}
            </Title>
          </Row>

          <Row>
            <Title level={1}>{info.text}</Title>
          </Row>

          <Row>
            <Text color={'gray'}>{info.subText}</Text>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export const WarehouseSummary = React.memo(WarehouseSummaryComponent);
