import { DateFormats } from '@/Constants/DateFormats';
import { WarehouseModel } from '@/Models/Contract';
import { numberUtils } from '@/Utils';
import { ColumnsType } from 'antd/lib/table/interface';
import moment from 'moment';

export const useWarehouseColumnsInfo = (): ColumnsType<WarehouseModel> => {
  return [
    {
      title: 'Склад',
      dataIndex: 'warehouse_name',
      width: 100,
      sorter: {
        compare: (a, b) => {
          return a.warehouse_name.localeCompare(b.warehouse_name);
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'На складе',
      dataIndex: 'in_warehouse',
      width: 120,
      sorter: {
        compare: (a, b) => {
          return a.in_warehouse - b.in_warehouse;
        },
      },
      render: (value, data) => {
        return numberUtils.getRoundedString(value, 0) ?? '-';
      },
    },
    {
      title: 'SKU в продаже',
      dataIndex: 'sku',
      width: 120,
      sorter: {
        compare: (a, b) => {
          return a.sku - b.sku;
        },
      },
      render: (value, data) => {
        return numberUtils.getRoundedString(value, 0) ?? '-';
      },
    },
    {
      title: 'SKU закончились',
      dataIndex: 'sku_ended',
      width: 120,
      sorter: {
        compare: (a, b) => {
          return a.sku_ended - b.sku_ended;
        },
      },
      render: (value, data) => {
        return numberUtils.getRoundedString(value, 0) ?? '-';
      },
    },
    {
      title: 'Стоимость остатков',
      width: 110,
      dataIndex: 'balance_cost',
      sorter: {
        compare: (a, b) => {
          return a.balance_cost - b.balance_cost;
        },
      },
      render: (value, data) => {
        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Выручка',
      dataIndex: 'revenue',
      width: 100,
      sorter: {
        compare: (a, b) => {
          return a.revenue - b.revenue;
        },
      },
      render: (value, data) => {
        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'В пути клиенту',
      width: 100,
      dataIndex: 'in_way_to_client',
      sorter: {
        compare: (a, b) => {
          return a.in_way_to_client - b.in_way_to_client;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'В пути от клиента',
      dataIndex: 'in_way_from_client',
      width: 120,
      sorter: {
        compare: (a, b) => {
          return a.in_way_from_client - b.in_way_from_client;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Поставлено товаров, шт.',
      dataIndex: 'products_delivered',
      width: 140,
      sorter: {
        compare: (a, b) => {
          return a.products_delivered - b.products_delivered;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Последняя поставка',
      width: 110,
      dataIndex: 'last_delivery',
      sorter: {
        compare: (a, b) => {
          return moment(a.last_delivery).diff(moment(b.last_delivery), 'milliseconds');
        },
      },
      render: (value, data) => {
        if (value) {
          const date = moment(String(value).replace('Z', ''));

          if (date) {
            return <span>{date.format(DateFormats.TableDateFormat)}</span>;
          }

          return 0;
        }
        return '-';
      },
    },
    {
      title: '№ поставки',
      dataIndex: 'income_id',
      width: 140,
      sorter: {
        compare: (a, b) => {
          return a.income_id - b.income_id;
        },
      },
      render: (value, data) => {
        return numberUtils.getRoundedString(value, 0);
      },
    },
  ];
};
