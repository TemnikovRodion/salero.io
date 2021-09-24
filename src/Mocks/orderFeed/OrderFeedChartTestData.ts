import { OrderFeedChartModel } from '@/Models/Contract';
import { ChartUnit, OrderType } from '@/Models/Enums';

export const orderFeedChartTestData: OrderFeedChartModel[] = [
  {
    chart_unit: ChartUnit.Rubles,
    chart_data: [
      {
        name: OrderType.Order,
        data: [
          {
            x: '2021-02-10',
            y: 73421,
          },
          {
            x: '2021-02-11',
            y: 22477,
          },
          {
            x: '2021-02-12',
            y: 11013,
          },
          {
            x: '2021-02-13',
            y: 49516,
          },
          {
            x: '2021-02-14',
            y: 51516,
          },
        ],
      },
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
    ],
  },
  {
    chart_unit: ChartUnit.Units,
    chart_data: [
      {
        name: OrderType.Sale,
        data: [
          {
            x: '2021-02-10',
            y: 150,
          },
          {
            x: '2021-02-11',
            y: 75,
          },
          {
            x: '2021-02-12',
            y: 25,
          },
          {
            x: '2021-02-13',
            y: 55,
          },
          {
            x: '2021-02-14',
            y: 47,
          },
        ],
      },
      {
        name: OrderType.Refund,
        data: [
          {
            x: '2021-02-10',
            y: 5,
          },
          {
            x: '2021-02-11',
            y: 46,
          },
          {
            x: '2021-02-12',
            y: 4,
          },
          {
            x: '2021-02-13',
            y: 33,
          },
          {
            x: '2021-02-14',
            y: 60,
          },
        ],
      },
    ],
  },
];
