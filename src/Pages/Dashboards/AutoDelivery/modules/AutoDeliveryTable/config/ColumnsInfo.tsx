import { Link, Text } from '@/Components/_Common';
import { AutodeliveryModel } from '@/Models/Contract';
import { numberUtils } from '@/Utils';
import { Checkbox, Row, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export function useAutodeliveryColumnsInfo(): ColumnsType<AutodeliveryModel> {
  return [
    {
      title: 'Штрихкод',
      dataIndex: 'barcode',
      width: 100,
    },
    {
      title: 'Бренд',
      dataIndex: 'product_brand',
      width: 100,
    },
    {
      title: 'Товар',
      dataIndex: 'product_name',
      width: 300,
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
      title: 'Размер',
      dataIndex: 'product_size',
      width: 100,
      sorter: {
        compare: (a, b) => {
          return a.product_size.localeCompare(b.product_size);
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Продаж в день',
      dataIndex: 'units_sales_per_day',
      width: 100,
      sorter: {
        compare: (a, b) => {
          return a.units_sales_per_day - b.units_sales_per_day;
        },
      },
      render: (value, data) => {
        return numberUtils.getRoundedString(value, 0);
      },
    },
    {
      title: 'Дней до пустого склада',
      dataIndex: 'out_of_stock_days',
      key: 'out_of_stock_days',
      width: 170,
      sorter: {
        compare: (a, b) => {
          return a.out_of_stock_days - b.out_of_stock_days;
        },
      },
      render: (value, data) => {
        return <Text color={value < 7 ? 'red' : 'black'}>{numberUtils.getRoundedString(value, 0)}</Text>;
      },
    },
    {
      title: 'Едет к/от клиенту(а)',
      dataIndex: 'on_way_to_or_from_client',
      width: 120,
      render: (value, data) => {
        return (
          numberUtils.getRoundedString(data.on_way_to_client, 0) +
          '/' +
          numberUtils.getRoundedString(data.on_way_from_client, 0)
        );
      },
    },
    {
      title: 'На складе, шт',
      dataIndex: 'stock_quantity',
      width: 140,
      sorter: {
        compare: (a, b) => {
          return a.stock_quantity - b.stock_quantity;
        },
      },
      render: (value, data) => {
        return value;
      },
    },
    {
      title: 'Допоставить на склад, шт',
      dataIndex: 'required_supply_count',
      width: 130,
      key: 'required_supply_count',
      sorter: {
        compare: (a, b) => {
          return a.required_supply_count - b.required_supply_count;
        },
      },
      render: (value, data) => {
        return <Tag color={'blue'}>{value}</Tag>;
      },
    },
    {
      title: 'Добавить в файл',
      dataIndex: 'need_add_in_file',
      width: 100,
      render: (value, data) => {
        return (
          <Row justify={'center'} align={'middle'}>
            <Checkbox
              defaultChecked={value}
              checked={value}
              onChange={(e) => {
                {
                  /* TODO: Проставка чекбокса */
                }
              }}
            />
          </Row>
        );
      },
    },
  ];
}
