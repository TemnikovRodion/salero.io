import { Link, Text } from '@/Components/_Common';
import { DateFormats } from '@/Constants/DateFormats';
import { AlertModel } from '@/Models/Contract';
import { DescriptionType } from '@/Models/Enums';
import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export function useAlertsColumnsInfo(): ColumnsType<AlertModel> {
  return [
    {
      title: 'Дата',
      dataIndex: 'alert_date',
      width: '20%',
      key: 'alert_date',
      sorter: {
        compare: (a, b) => {
          return moment(a.alert_date).diff(b.alert_date);
        },
      },
      render: (value, data) => {
        let date = moment(value.replace('Z', ''));

        if (date) {
          return <Text color={'gray'}>{date.format(DateFormats.TableDateTimeFormat)}</Text>;
        }

        return '-';
      },
    },
    {
      title: 'Товары',
      dataIndex: 'product_name',
      width: '40%',
      key: 'product_name',
      sorter: {
        compare: (a, b) => {
          return a.product_name.localeCompare(b.product_name);
        },
      },
      render: (value, data) => {
        return (
          <>
            <Row align={'middle'}>
              <Col>
                <img
                  style={{
                    width: '75px',
                    objectFit: 'contain',
                    height: '75px',
                    borderRadius: '10px',
                  }}
                  alt={value}
                  src={data.product_image}
                />{' '}
              </Col>
              <Col span={18}>
                <Row>
                  <Link
                    color={'blue'}
                    target="_blank"
                    location={`https://www.wildberries.ru/catalog/${data.barcode}/detail.aspx`}
                  >
                    {value}
                  </Link>
                </Row>
                <Row>
                  <Text color={'gray'}>{data.barcode}</Text>
                </Row>
              </Col>
            </Row>
          </>
        );
      },
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      width: '40%',
      key: 'description',
      sorter: {
        compare: (a, b) => {
          return a.description.localeCompare(b.description);
        },
      },
      render: (value, data) => {
        return <Text color={data.description_type === DescriptionType.ProductEnd ? 'red' : 'black'}>{value}</Text>;
      },
    },
  ];
}
