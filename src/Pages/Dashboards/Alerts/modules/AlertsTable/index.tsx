import React, { useEffect, useMemo, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Title } from '@/Components/_Common';
import { DataTable, DateRangePicker, MultipleSelect, PageSizeSelect } from '@/Components';
import { AlertModel } from '@/Models/Contract';
import { userSelectors } from '@/Reducer/User/selectors';
import { useAlertsColumnsInfo } from './config';
import { alertsSelectors } from '@/Reducer/Alerts/selectors';
import { alertsTestData } from '@/Mocks';
import { productsActions, productsAsyncActions } from '@/Reducer/Products/reducer';
import { AppDispatch } from '@/Reducer/Store';
import { useDescriptions } from '@/Models/Enums';
import './styles.scss';

type Props = {};

const AlertsTableComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const alertsTableData = useSelector(alertsSelectors.alertsTableData);
  const alertsDateFilter = useSelector(alertsSelectors.alertsDateFilter);
  const descriptions = useDescriptions();

  // Фильтры таблицы
  const [pageSize, setPageSize] = useState(100);
  const [searchValue, setSearchValue] = useState<string[]>([]);

  // Cтолбцы таблицы
  const columns = useAlertsColumnsInfo();

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    return isUserStoreConnected ? alertsTableData : alertsTestData;
  }, [alertsTableData, searchValue]);

  // Индикатор загрузки данных
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка данных для таблицы
  const loadData = (date_from: string, date_to: string) => {
    setIsLoading(true);

    dispatch(
      productsAsyncActions.get({
        date_from: date_from,
        date_to: date_to,
      }),
    ).then((response) => {
      setIsLoading(false);
    });
  };

  // Начальная загрузка таблицы
  useEffect(() => {
    if (isUserStoreConnected && alertsTableData.length === 0) {
      loadData(alertsDateFilter.date_from, alertsDateFilter.date_to);
    } // if
  }, [isUserStoreConnected]);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <Row align={'middle'} justify={'space-between'}>
            <Col>
              <Title level={4}>
                <DateRangePicker
                  title={'Отчет за'}
                  value={alertsDateFilter}
                  disabled={!isUserStoreConnected}
                  onChange={(value) => {
                    dispatch(
                      productsActions.setProductsDateFilter({
                        date_from: value[0],
                        date_to: value[1],
                      }),
                    );

                    loadData(value[0], value[1]);
                  }}
                />
              </Title>

              <Text>{'Вы можете настроить получаемые уведомления'}</Text>
            </Col>

            <Col span={8}>
              <MultipleSelect
                placeholder={'Показывать все категории'}
                options={descriptions}
                onChange={(value) => setSearchValue(value as string[])}
              />
            </Col>

            <Col span={5}>
              <PageSizeSelect value={String(pageSize)} onChange={(value) => setPageSize(Number(value))} />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <DataTable<AlertModel>
            rowKey={'barcode'}
            columns={columns}
            dataSource={
              searchValue.length === 0
                ? tableDataSource
                : tableDataSource.filter((item) => searchValue.includes(item.description_type))
            }
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

export const AlertsTable = React.memo(AlertsTableComponent);
