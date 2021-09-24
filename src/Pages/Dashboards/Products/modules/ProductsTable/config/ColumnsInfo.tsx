import { ProductModel } from '@/Models/Contract';
import { numberUtils, stringUtils } from '@/Utils';
import { Link, Text } from '@/Components/_Common';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export function useProductColumnsInfo(): ColumnsType<ProductModel> {
  return [
    {
      title: 'Штрихкод',
      width: 115,
      dataIndex: 'barcode',
    },
    {
      title: 'Бренд',
      width: 140,
      dataIndex: 'product_brand',
      sorter: {
        compare: (a, b) => {
          return a.product_brand.localeCompare(b.product_brand);
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Товар',
      width: 450,
      dataIndex: 'product_name',
      render: (value, data) => {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '75px 1fr', columnGap: 10, alignItems: 'center' }}>
            <img
              alt={data.product_name}
              src={data.image}
              style={{
                width: 75,
                height: 75,
                objectFit: 'contain',
                borderRadius: 10,
              }}
            />

            <Link
              target="_blank"
              color={'blue'}
              location={`https://www.wildberries.ru/catalog/${data.nm_id}/detail.aspx`}
              weight={'bold'}
            >
              {data.product_name}
            </Link>
          </div>
        );
      },
    },
    {
      title: 'Продано, шт.',
      width: 140,
      dataIndex: 'sold_quantity',
      sorter: {
        compare: (a, b) => {
          return a.sold_quantity - b.sold_quantity;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Выручка',
      width: 140,
      dataIndex: 'sold_amount',
      sorter: {
        compare: (a, b) => {
          return a.sold_amount - b.sold_amount;
        },
      },
      render: (value, data) => {
        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Цена продажи',
      width: 120,
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => {
          return a.price - b.price;
        },
      },
      render: (value, data) => {
        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Остаток, шт.',
      width: 140,
      dataIndex: 'balance',
      sorter: {
        compare: (a, b) => {
          return a.balance - b.balance;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Продаж в день',
      width: 140,
      dataIndex: 'sales_per_day',
      sorter: {
        compare: (a, b) => {
          return a.sales_per_day - b.sales_per_day;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'До пустого склада',
      width: 140,
      dataIndex: 'to_an_empty_warehouse',
      sorter: {
        compare: (a, b) => {
          return a.to_an_empty_warehouse - b.to_an_empty_warehouse;
        },
      },
      render: (value, data) => {
        if (Number(value) === 0) {
          return (
            <Tag
              style={{ textAlign: 'center', width: '100%', height: 'fit-content', display: 'inline-block' }}
              color={'volcano'}
            >
              Склад пуст
            </Tag>
          );
        } // if

        if (Number(value) === -1) {
          return (
            <Tag
              style={{ textAlign: 'center', width: '100%', height: 'fit-content', display: 'inline-block' }}
              color={'magenta'}
            >
              Нет продаж
              <br />
              более 30 дней
            </Tag>
          );
        } // if

        if (Number(value) < 7 && Number(value) > 0) {
          return (
            <Tag
              style={{ textAlign: 'center', width: '100%', height: 'fit-content', display: 'inline-block' }}
              color={'yellow'}
            >
              {stringUtils.getFormattedDay(value)}
            </Tag>
          );
        } // if

        return (
          <Tag
            style={{ textAlign: 'center', width: '100%', height: 'fit-content', display: 'inline-block' }}
            color={'blue'}
          >
            {stringUtils.getFormattedDay(value)}
          </Tag>
        );
      },
    },
    {
      title: 'Cкидка',
      dataIndex: 'discount',
      width: 100,
      sorter: {
        compare: (a, b) => {
          return a.discount - b.discount;
        },
      },
      render: (value, data) => {
        return Number(value).toFixed(0) + '%';
      },
    },
    {
      title: 'Промо',
      dataIndex: 'promo',
      width: 100,
      sorter: {
        compare: (a, b) => {
          return a.promo - b.promo;
        },
      },
      render: (value, data) => {
        return Number(value).toFixed(0) + '%';
      },
    },
    {
      title: 'Стоимость остатка',
      width: 130,
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
      title: 'Упущенная прибыль',
      width: 130,
      dataIndex: 'lost_profit',
      sorter: {
        compare: (a, b) => {
          return a.lost_profit - b.lost_profit;
        },
      },
      render: (value, data) => {
        return numberUtils.getMoneyString(value);
      },
    },
  ];
}
