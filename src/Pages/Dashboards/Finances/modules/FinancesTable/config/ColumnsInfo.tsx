import { Link, Text } from '@/Components/_Common';
import { FinanceModel } from '@/Models/Contract';
import { numberUtils } from '@/Utils';
import { ColumnsType } from 'antd/lib/table';

export function useFinancesColumnsInfo(): ColumnsType<FinanceModel> {
  return [
    {
      title: 'Название',
      dataIndex: 'product_name',
      fixed: 'left',
      width: 300,
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>По всем товарам</Text>;
        }

        return (
          <Link
            weight={'bold'}
            color={'blue'}
            target="_blank"
            location={`https://www.wildberries.ru/catalog/${data.barcode}/detail.aspx`}
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: 'Заказы, шт',
      dataIndex: 'orders_count',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.orders_count - b.orders_count;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{value}</Text>;
        }

        return numberUtils.getRoundedString(value, 0);
      },
    },
    {
      title: 'Продажи, шт',
      dataIndex: 'sales_count',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.sales_count - b.sales_count;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getMoneyString(value)}</Text>;
        }

        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Процент выкупа, %',
      dataIndex: 'redemption_percentage',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.redemption_percentage - b.redemption_percentage;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getRoundedString(value, 0) + ' %'}</Text>;
        }

        return numberUtils.getRoundedString(value, 0) + ' %';
      },
    },
    {
      title: 'Себе-ть 1 е.д. товара, ₽',
      dataIndex: 'prime_cost',
      key: 'prime_cost',
      width: 150,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.prime_cost - b.prime_cost;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getMoneyString(value)}</Text>;
        }

        return (
          /* TODO: Редактирование добавить */
          numberUtils.getMoneyString(value)
        );
      },
    },
    {
      title: 'Марж-ть товара, %',
      dataIndex: 'margin_percentage',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.margin_percentage - b.margin_percentage;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getRoundedString(value, 0) + ' %'}</Text>;
        }

        return numberUtils.getRoundedString(value, 0) + ' %';
      },
    },
    {
      title: 'Комиссия WB, ₽',
      dataIndex: 'store_commission',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.store_commission - b.store_commission;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getMoneyString(value)}</Text>;
        }

        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Логистика, ₽',
      dataIndex: 'logistics_cost',
      width: 140,
      key: 'logistics_cost',
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.logistics_cost - b.logistics_cost;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getMoneyString(value)}</Text>;
        }

        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Стоимость хранения, ₽',
      dataIndex: 'storage_cost',
      key: 'storage_cost',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.storage_cost - b.storage_cost;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getMoneyString(value)}</Text>;
        }

        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Налог, %',
      dataIndex: 'tax',
      key: 'tax',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.tax - b.tax;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return (
            /* TODO: Добавить редактирование */
            numberUtils.getRoundedString(value, 0) + ' %'
          );
        }

        return numberUtils.getRoundedString(value, 0) + ' %';
      },
    },
    {
      title: 'Валовая прибыль, ₽',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.gross_profit - b.gross_profit;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getMoneyString(value)}</Text>;
        }

        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Чистая прибыль, ₽',
      dataIndex: 'net_profit',
      key: 'net_profit',
      width: 140,
      sorter: {
        compare: (a, b) => {
          if (a.barcode === 'total-system' || b.barcode === 'total-system') {
            return 0;
          }

          return a.net_profit - b.net_profit;
        },
      },
      render: (value, data) => {
        if (data.barcode === 'total-system') {
          return <Text weight={'bold'}>{numberUtils.getMoneyString(value)}</Text>;
        }

        return numberUtils.getMoneyString(value);
      },
    },
  ];
}
