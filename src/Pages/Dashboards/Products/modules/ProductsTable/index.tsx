import React, { useMemo, useState } from 'react';
import { DataTable, DownloadButton, PageSizeSelect, SearchInput } from '@/Components';
import { ProductModel } from '@/Models/Contract';
import { useProductColumnsInfo, useProductsTableSummary } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { productsSelectors } from '@/Reducer/Products/selectors';
import { Card, Col, Row } from 'antd';
import { productsTestData } from '@/Mocks';
import { productsAsyncActions } from '@/Reducer/Products/reducer';
import './styles.scss';

type Props = {
  isLoading: boolean;
};

const ProductsTableComponent = ({ isLoading }: Props): React.ReactElement => {
  const dispatch = useDispatch();
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const productsTableData = useSelector(productsSelectors.productsTableData);
  const productsDateFilter = useSelector(productsSelectors.productsDateFilter);

  // Фильтры таблицы
  const [pageSize, setPageSize] = useState(100);
  const [searchValue, setSearchValue] = useState('');

  // Cтолбцы таблицы
  const columns = useProductColumnsInfo();
  const summary = useProductsTableSummary();

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    return isUserStoreConnected ? productsTableData : productsTestData;
  }, [productsTableData, isUserStoreConnected]);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <Row align={'middle'} justify={'space-between'}>
            <Col span={14}>
              <SearchInput
                placeholder={'Поиск по штрихкоду или названию'}
                onChange={(value) => setSearchValue(value)}
              />
            </Col>

            <Col span={6}>
              <PageSizeSelect value={String(pageSize)} onChange={(value) => setPageSize(Number(value))} />
            </Col>

            <Col>
              <DownloadButton
                text={'Excel'}
                onClick={() => dispatch(productsAsyncActions.getExcel({ ...productsDateFilter }))}
                disabled={!isUserStoreConnected}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <DataTable<ProductModel>
            rowKey={'barcode'}
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
            summary={() => summary}
            isLoading={isLoading}
          />
        </Card>
      </Col>
    </Row>
  );
};

export const ProductsTable = React.memo(ProductsTableComponent);
