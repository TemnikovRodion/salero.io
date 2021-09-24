import { FinanceChartModel } from '@/Models/Contract';
import { FinanceType, OrderType } from '@/Models/Enums';

export const financesChartTestData: FinanceChartModel = {
  chartData: [
    {
      name: OrderType.Sale,
      data: [
        {
          x: '2021-02-10',
          y: 75421,
        },
        {
          x: '2021-02-11',
          y: 27477,
        },
        {
          x: '2021-02-12',
          y: 10013,
        },
        {
          x: '2021-02-13',
          y: 48516,
        },
        {
          x: '2021-02-14',
          y: 48516,
        },
      ],
    },
    {
      name: OrderType.Refund,
      data: [
        {
          x: '2021-02-10',
          y: 1211,
        },
        {
          x: '2021-02-11',
          y: 45343,
        },
        {
          x: '2021-02-12',
          y: 1231,
        },
        {
          x: '2021-02-13',
          y: 31231,
        },
        {
          x: '2021-02-14',
          y: 48516,
        },
      ],
    },
    {
      name: FinanceType.GrossProfit,
      data: [
        {
          x: '2021-02-10',
          y: 1511,
        },
        {
          x: '2021-02-11',
          y: 11343,
        },
        {
          x: '2021-02-12',
          y: 1731,
        },
        {
          x: '2021-02-13',
          y: 13231,
        },
        {
          x: '2021-02-14',
          y: 18516,
        },
      ],
    },
  ],
};
