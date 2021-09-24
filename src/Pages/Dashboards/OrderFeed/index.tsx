import React, { useEffect, useRef, useState } from 'react';
import { ContentWrapper, DashboardTitle, DateRangePicker } from '@/Components';
import { Title } from '@/Components/_Common';
import { Card, Col, Row } from 'antd';
import { OrderFeedChart, OrderFeedSummary, OrderFeedTable } from './modules';
import { Images } from '@/Static';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { orderFeedActions, orderFeedAsyncActions } from '@/Reducer/OrderFeed/reducer';
import { AppDispatch } from '@/Reducer/Store';
import { orderFeedSelectors } from '@/Reducer/OrderFeed/selectors';
import './styles.scss';

type Props = {};

const OrderFeed = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const mountedRef = useRef(true);
  const orderFeedTableData = useSelector(orderFeedSelectors.orderFeedTableData);
  const orderFeedDateFilter = useSelector(orderFeedSelectors.orderFeedDateFilter);
  const isUserSynchronized = useSelector(userSelectors.isUserSynchronized);

  // Индикатор загрузки данных
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка данных для таблицы
  const loadData = (date_from: string, date_to: string) => {
    setIsLoading(true);

    dispatch(
      orderFeedAsyncActions.get({
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

    if (isUserSynchronized && orderFeedTableData.orders.length === 0) {
      loadData(orderFeedDateFilter.date_from, orderFeedDateFilter.date_to);
    } // if

    return () => {
      mountedRef.current = false;
    };
  }, [isUserSynchronized]);

  return (
    <ContentWrapper>
      <Row justify={'space-between'}>
        <Col span={18}>
          <DashboardTitle
            title={'Лента заказов'}
            text={'Сводная информация по заказам, продажам и возвратам каждого товара.'}
          />

          <Card className={'order-feed-filters'}>
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <Title level={2}>Выберите период</Title>
              </Col>

              <Col span={24}>
                <DateRangePicker
                  disabled={!isUserSynchronized}
                  title={'Показать динамику и ленту заказов за'}
                  value={orderFeedDateFilter}
                  onChange={(value) => {
                    dispatch(
                      orderFeedActions.setOrderFeedDateFilter({
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

        <Col>
          <img alt={'order-feed-logo'} src={Images.Dashboards.OrderFeedLogo} width={'auto'} height={140} />
        </Col>
      </Row>

      <Row gutter={[24, 0]}>
        <Col span={18}>
          <Card loading={isLoading}>
            <OrderFeedChart />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <OrderFeedSummary />
          </Card>
        </Col>
      </Row>

      <Card>
        <OrderFeedTable isLoading={isLoading} />
      </Card>
    </ContentWrapper>
  );
};

export default OrderFeed;
