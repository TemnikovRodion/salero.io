import React, { useEffect, useMemo, useState } from 'react';
import { DataTable, DownloadButton, MultipleSelect } from '@/Components';
import { WarehouseModel } from '@/Models/Contract';
import { AppDispatch } from '@/Reducer/Store';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { useWarehouseColumnsInfo } from './config';
import { warehousesSelectors } from '@/Reducer/Warehouses/selectors';
import { warehousesAsyncActions } from '@/Reducer/Warehouses/reducer';
import { Card, Col, Row } from 'antd';
import { warehousesTestData } from '@/Mocks';
import './styles.scss';

type Props = {
  isLoading: boolean;
};

const WarehouseTableComponent = ({ isLoading }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const warehousesDateFilter = useSelector(warehousesSelectors.warehousesDateFilter);
  const warehousesTableData = useSelector(warehousesSelectors.warehousesTableData);

  // Фильтры таблицы
  const [searchValue, setSearchValue] = useState<string[]>([]);

  // Cтолбцы таблицы
  const columns = useWarehouseColumnsInfo();

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    setSearchValue([]);
    return isUserStoreConnected ? warehousesTableData : warehousesTestData;
  }, [warehousesTableData, isUserStoreConnected]);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <Row justify={'space-between'} align={'middle'}>
            <Col span={15}>
              <MultipleSelect
                placeholder={'Показывать все склады'}
                disabled={!isUserStoreConnected}
                defaultValue={searchValue}
                options={tableDataSource.map((item) => ({
                  key: item.warehouse_name,
                  value: item.warehouse_name,
                }))}
                onChange={(value) => {
                  setSearchValue(value as string[]);
                  dispatch(
                    warehousesAsyncActions.getSummary({
                      warehouse_list: value as string[],
                      ...warehousesDateFilter,
                    }),
                  );
                }}
              />
            </Col>

            <Col>
              <DownloadButton
                text={'Excel'}
                onClick={() => dispatch(warehousesAsyncActions.getExcel({ ...warehousesDateFilter }))}
                disabled={!isUserStoreConnected}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <DataTable<WarehouseModel>
            rowKey={'warehouse_name'}
            columns={columns}
            dataSource={
              searchValue.length !== 0
                ? tableDataSource.filter((item) => searchValue.includes(item.warehouse_name))
                : tableDataSource
            }
            pagination={{
              pageSize: 50,
              total: tableDataSource.length,
            }}
            isLoading={isLoading}
          />
        </Card>
      </Col>
    </Row>
  );
};

export const WarehouseTable = React.memo(WarehouseTableComponent);
