import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { ContentWrapper, DashboardTitle, DateRangePicker } from '@/Components';
import { WarehouseSummary, WarehouseTable } from './modules';
import { Title } from '@/Components/_Common';
import { useDispatch, useSelector } from 'react-redux';
import { warehousesSelectors } from '@/Reducer/Warehouses/selectors';
import { warehousesActions, warehousesAsyncActions } from '@/Reducer/Warehouses/reducer';
import { userSelectors } from '@/Reducer/User/selectors';
import { AppDispatch } from '@/Reducer/Store';
import './styles.scss';

type Props = {};

const Warehouse = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const mountedRef = useRef(true);
  const isUserSynchronized = useSelector(userSelectors.isUserSynchronized);
  const warehousesTableData = useSelector(warehousesSelectors.warehousesTableData);
  const warehousesDateFilter = useSelector(warehousesSelectors.warehousesDateFilter);

  // Индикатор загрузки данных для таблицы
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка данных для таблицы
  const loadData = (date_from: string, date_to: string) => {
    setIsLoading(true);

    dispatch(
      warehousesAsyncActions.get({
        date_from: date_from,
        date_to: date_to,
      }),
    ).then((response) => {
      if (mountedRef.current) {
        setIsLoading(false);
      } // if
    });
  };

  // Начальная загрузка таблицы
  useEffect(() => {
    mountedRef.current = true;

    if (isUserSynchronized && warehousesTableData.length === 0) {
      loadData(warehousesDateFilter.date_from, warehousesDateFilter.date_to);
    } // if

    return () => {
      mountedRef.current = false;
    };
  }, [isUserSynchronized]);

  return (
    <ContentWrapper>
      <Row justify={'space-between'}>
        <Col span={24}>
          <DashboardTitle title={'Склад'} text={'Статистика по всем складам'} />

          <Card className={'order-feed-filters'}>
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <Title level={2}>Выберите период</Title>
              </Col>

              <Col span={24}>
                <DateRangePicker
                  title={'Показать склады за'}
                  value={warehousesDateFilter}
                  disabled={!isUserSynchronized}
                  onChange={(value) => {
                    dispatch(
                      warehousesActions.setWarehousesDateFilter({
                        date_from: value[0],
                        date_to: value[1],
                      }),
                    );

                    loadData(value[0], value[1]);
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <WarehouseSummary />
        </Col>

        <Col span={24}>
          <WarehouseTable isLoading={isLoading} />
        </Col>
      </Row>
    </ContentWrapper>
  );
};

export default Warehouse;
