import React, { useMemo, useState } from 'react';
import { DataTable, DownloadButton, PageSizeSelect, SearchInput } from '@/Components';
import { OrderFeedModel } from '@/Models/Contract';
import { useOrderFeedColumnsInfo } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { Card, Col, Radio, Row } from 'antd';
import { OrderType, useOrderTypes } from '@/Models/Enums';
import { orderFeedTestData } from '@/Mocks';
import { orderFeedSelectors } from '@/Reducer/OrderFeed/selectors';
import { orderFeedAsyncActions } from '@/Reducer/OrderFeed/reducer';
import './styles.scss';

type Props = {
  isLoading: boolean;
};

const OrderFeedTableComponent = ({ isLoading }: Props): React.ReactElement => {
  const dispatch = useDispatch();
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const orderFeedTableData = useSelector(orderFeedSelectors.orderFeedTableData);
  const orderFeedDateFilter = useSelector(orderFeedSelectors.orderFeedDateFilter);
  const orderTypes = useOrderTypes();

  // Фильтры таблицы
  const [pageSize, setPageSize] = useState(100);
  const [searchValue, setSearchValue] = useState('');
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType>(OrderType.Order);

  // Cтолбцы таблицы
  const columns = useOrderFeedColumnsInfo();

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    if (!isUserStoreConnected) return orderFeedTestData;

    switch (selectedOrderType) {
      case OrderType.Order:
        return orderFeedTableData.orders;

      case OrderType.Sale:
        return orderFeedTableData.sales;

      default:
        return orderFeedTableData.refunds;
    } // switch
  }, [orderFeedTableData, selectedOrderType, isUserStoreConnected]);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <Row align={'middle'} justify={'space-between'}>
            <Col>
              <Radio.Group value={selectedOrderType}>
                {orderTypes.map((item, idx) => (
                  <Radio.Button
                    key={idx}
                    value={item.key}
                    onChange={(e) => {
                      setSelectedOrderType(e.target.value);
                    }}
                  >
                    {item.value}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Col>

            <Col span={8}>
              <SearchInput
                placeholder={'Поиск по штрихкоду или названию'}
                onChange={(value) => setSearchValue(value)}
              />
            </Col>

            <Col span={5}>
              <PageSizeSelect value={String(pageSize)} onChange={(value) => setPageSize(Number(value))} />
            </Col>

            <Col>
              <DownloadButton
                text={'Excel'}
                disabled={!isUserStoreConnected}
                onClick={() => dispatch(orderFeedAsyncActions.getExcel({ ...orderFeedDateFilter }))}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <DataTable<OrderFeedModel>
            rowKey={'id'}
            columns={columns}
            dataSource={tableDataSource.filter(
              (item) =>
                item.barcode.toLowerCase().includes(searchValue) ||
                item.product_name.toLowerCase().includes(searchValue),
            )}
            pagination={{
              pageSize: pageSize,
              total: tableDataSource.length,
            }}
            isLoading={isLoading}
          />
        </Card>
      </Col>
    </Row>
  );
};

export const OrderFeedTable = React.memo(OrderFeedTableComponent);
