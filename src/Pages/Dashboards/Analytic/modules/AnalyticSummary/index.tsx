import React from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AsideSummary } from '@/Components';
import { analyticSummaryTestData } from '@/Mocks';
import { analyticSelectors } from '@/Reducer/Analytic/selectors';
import { userSelectors } from '@/Reducer/User/selectors';
import { numberUtils, stringUtils } from '@/Utils';
import './styles.scss';

type Props = {};

const AnalyticSummaryComponent = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const analyticSummaryData = useSelector(analyticSelectors.analyticSummaryData);

  // TODO: Перенести в редьюсер
  const summary = useMemo(() => {
    const summaryDataSource = isUserStoreConnected ? analyticSummaryData : analyticSummaryTestData;

    const turnoverComment = summaryDataSource
      ? summaryDataSource.turnoverdays > 101
        ? 'Это плохой показатель'
        : summaryDataSource.turnoverdays > 51 && summaryDataSource.turnoverdays <= 100
        ? 'Это хороший показатель'
        : 'Это отличный показатель'
      : 'Это плохой показатель';

    const redemptionPersentComment = summaryDataSource
      ? summaryDataSource.redpercentage < 50
        ? 'Это плохой показатель'
        : summaryDataSource.redpercentage >= 50 && summaryDataSource.redpercentage < 75
        ? 'Это хороший показатель'
        : 'Это отличный показатель'
      : 'Это плохой показатель';

    return [
      {
        title: 'Продажи...', // TODO: Дату добавить
        subTitle: numberUtils.getMoneyString(summaryDataSource?.totalSales ?? 0), // TODO: Добавить тренд
        text: `${numberUtils.getRoundedString(summaryDataSource?.salesCount ?? 0, 0)} единиц товара`,
      },
      {
        title: 'Оборачиваемость',
        subTitle: stringUtils.getFormattedDay(summaryDataSource?.turnoverdays ?? 0),
        text: turnoverComment ?? '',
        tooltip:
          'Оборачиваемость – период времени, за который продаётся средний запас товара, находящегося на складе. Чем ниже оборачиваемость в днях, тем быстрее реализуется средний остаток товара.',
      },
      {
        title: 'Процент выкупа',
        subTitle: `${summaryDataSource?.redpercentage ?? 0} %`,
        text: redemptionPersentComment ?? '',
        tooltip: 'Процент выкупа - соотношение выкупленных товаров к заказанным.',
      },
    ];
  }, [analyticSummaryData, isUserStoreConnected]);

  return <AsideSummary options={summary} />;
};

export const AnalyticSummary = React.memo(AnalyticSummaryComponent);
