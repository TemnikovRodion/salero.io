import { Link, Text } from '@/Components/_Common';
import { AnalyticModel } from '@/Models/Contract';
import { useProductCategories } from '@/Models/Enums';
import { numberUtils } from '@/Utils';
import { Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export function useAnalyticColumnsInfo(totalItems: number): ColumnsType<AnalyticModel> {
  const productCategories = useProductCategories();

  return [
    {
      title: `Товар (${totalItems})`,
      dataIndex: 'name',
      width: 400,
      render: (value, data) => {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '75px 1fr', columnGap: 10, alignItems: 'center' }}>
            <img
              alt={data.name}
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
              location={`https://www.wildberries.ru/catalog/${data.nmid}/detail.aspx`}
              weight={'bold'}
            >
              {data.name}
              {data.isNew && (
                <Tag style={{ marginLeft: '10px', color: '#005f0c' }} color="#2dd28b">
                  new
                </Tag>
              )}
            </Link>
          </div>
        );
      },
    },
    {
      title: 'Штрихкод',
      dataIndex: 'nmid',
      width: 150,
    },
    {
      title: 'Рейтинг Salero',
      dataIndex: 'rating',
      width: 150,
      sorter: {
        compare: (a, b) => a.ratingNumber - b.ratingNumber,
      },
      render: (value, data) => (
        <Text>
          <img alt={'rating'} src={productCategories.find((item) => item.key === value)?.image} />
          {` — ${data.ratingNumber}`}
        </Text>
      ),
    },
    {
      title: 'Продажи, ₽/мес.',
      dataIndex: 'sales_amount_per_month',
      width: 200,
      sorter: {
        compare: (a, b) => a.sales_amount_per_month - b.sales_amount_per_month,
      },
      render: (value, data) => {
        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      width: 150,
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
      render: (value, data) => {
        return numberUtils.getMoneyString(value);
      },
    },
    {
      title: 'Скидка',
      dataIndex: 'discount',
      width: 150,
      sorter: {
        compare: (a, b) => a.discount - b.discount,
      },
      render: (value, data) => {
        return `${value} %`;
      },
    },
    {
      title: 'Цена со скидкой',
      dataIndex: 'price_with_discount',
      width: 200,
      sorter: {
        compare: (a, b) => a.price_with_discount - b.price_with_discount,
      },
      render: (value, data) => {
        return (
          <span>
            <Tooltip placement="topLeft" title="Рассчитано по последней продаже с учетом всех скидок">
              {numberUtils.getMoneyString(value)}
            </Tooltip>
          </span>
        );
      },
    },
    {
      title: 'Продано, штук/мес.',
      dataIndex: 'units_sales_per_month',
      width: 200,
      sorter: {
        compare: (a, b) => a.units_sales_per_month - b.units_sales_per_month,
      },
    },
    {
      title: '% Выкупа/мес.',
      dataIndex: 'redemption',
      width: 200,
      sorter: {
        compare: (a, b) => a.redemption - b.redemption,
      },
      render: (value, data) => {
        return `${value} %`;
      },
    },
    {
      title: 'Оборачиваемость, дней',
      dataIndex: 'turn_over',
      width: 200,
      sorter: {
        compare: (a, b) => a.turn_over - b.turn_over,
      },
      render: (value, data) => {
        return value === 9999 ? '—' : value;
      },
    },
  ];
}
