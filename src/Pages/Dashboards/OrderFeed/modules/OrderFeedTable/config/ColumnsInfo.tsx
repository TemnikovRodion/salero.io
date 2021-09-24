import { Link, Text } from '@/Components/_Common';
import { DateFormats } from '@/Constants/DateFormats';
import { OrderFeedModel } from '@/Models/Contract';
import { numberUtils } from '@/Utils';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export function useOrderFeedColumnsInfo(): ColumnsType<OrderFeedModel> {
  return [
    {
      title: 'Дата и время',
      dataIndex: 'date',
      width: '160px',
      sorter: {
        compare: (a, b) => {
          return moment(a.date).diff(moment(b.date), 'millisecond');
        },
      },
      render: (value, data) => {
        let date = moment(value.replace('Z', ''));

        if (date) {
          return <Text color={'gray'}>{date.format(DateFormats.TableDateTimeFormat)}</Text>;
        }

        return 0;
      },
    },
    {
      title: 'Штрихкод',
      width: '100px',
      dataIndex: 'barcode',
    },
    {
      title: 'Товар',
      width: '350px',
      dataIndex: 'product_name',
      render: (value, data) => {
        return (
          <Link
            target="_blank"
            location={`https://www.wildberries.ru/catalog/${data.nm_id}/detail.aspx`}
            color={'blue'}
            weight={'bold'}
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: 'Заказ, №',
      dataIndex: 'order_id',
      width: '120px',
      sorter: {
        compare: (a, b) => {
          return a.order_id - b.order_id;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Размер',
      dataIndex: 'size',
      width: '100px',
      sorter: {
        compare: (a, b) => {
          return a.size.localeCompare(b.size);
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Кол-во',
      dataIndex: 'quantity',
      width: '100px',
      sorter: {
        compare: (a, b) => {
          return a.quantity - b.quantity;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Cкидка, %',
      width: '120px',
      dataIndex: 'discount',
      sorter: {
        compare: (a, b) => {
          return a.discount - b.discount;
        },
      },
      render: (value, data) => {
        return numberUtils.getRoundedString(value, 0) + ' %';
      },
    },
    {
      title: 'Итоговая цена, ₽',
      dataIndex: 'total_price',
      width: '170px',
      sorter: {
        compare: (a, b) => {
          return a.total_price - b.total_price;
        },
      },
      render: (value, data) => {
        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Склад отправки',
      dataIndex: 'dispatch_warehouse',
      width: '170px',
      sorter: {
        compare: (a, b) => {
          return a.dispatch_warehouse.localeCompare(b.dispatch_warehouse);
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Регион доставки',
      dataIndex: 'delivery_region',
      width: '170px',
      sorter: {
        compare: (a, b) => {
          return a.delivery_region.localeCompare(b.delivery_region);
        },
      },
      render: (value, data) => {
        return value;
      },
    },
  ];
}
