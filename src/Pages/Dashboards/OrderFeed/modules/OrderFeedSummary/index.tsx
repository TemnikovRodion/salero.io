import React, { useCallback, useMemo } from 'react';
import { AsideSummary } from '@/Components';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { orderFeedSelectors } from '@/Reducer/OrderFeed/selectors';
import { orderFeedSummaryTestData } from '@/Mocks';
import { numberUtils } from '@/Utils';
import './styles.scss';
import { Svg } from '@/Static';

type Props = {};

const OrderFeedSummaryComponent = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const orderFeedSummaryData = useSelector(orderFeedSelectors.orderFeedSummaryData);

  const summary = useMemo(() => {
    const summaryDataSource = isUserStoreConnected ? orderFeedSummaryData : orderFeedSummaryTestData;

    return [
      {
        title: 'Выручка',
        subTitle: numberUtils.getMoneyString(summaryDataSource?.revenue ?? 0),
        text: `${summaryDataSource?.revenue_deviation ?? 0} % от среднего`,
        trend:
          summaryDataSource &&
          (summaryDataSource.revenue_deviation < 0
            ? Svg.TrendingDown
            : summaryDataSource.revenue_deviation > 0
            ? Svg.TrendingUp
            : undefined),
      },
      {
        title: 'Продажи',
        subTitle: `${numberUtils.getRoundedString(summaryDataSource?.sales ?? 0)} шт`,
        text: `${summaryDataSource?.sales_deviation ?? 0} % от среднего`,
        trend:
          summaryDataSource &&
          (summaryDataSource.sales_deviation < 0
            ? Svg.TrendingDown
            : summaryDataSource.sales_deviation > 0
            ? Svg.TrendingUp
            : undefined),
      },
      {
        title: 'Движение товаров в пути',
        subTitle: `${summaryDataSource?.in_way_to_client ?? 0} к клиенту`,
        text: `${summaryDataSource?.in_way_from_client ?? 0} от клиента`,
      },
    ];
  }, [orderFeedSummaryData, isUserStoreConnected]);

  return <AsideSummary options={summary} />;
};

export const OrderFeedSummary = React.memo(OrderFeedSummaryComponent);
