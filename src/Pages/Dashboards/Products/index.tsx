import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { ContentWrapper, DashboardTitle, DateRangePicker } from '@/Components';
import { Images } from '@/Static';
import { ProductsTable } from './modules';
import { Title } from '@/Components/_Common';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions, productsAsyncActions } from '@/Reducer/Products/reducer';
import { productsSelectors } from '@/Reducer/Products/selectors';
import { userSelectors } from '@/Reducer/User/selectors';
import { AppDispatch } from '@/Reducer/Store';
import './styles.scss';

type Props = {};

const Products = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const mountedRef = useRef(true);
  const isUserSynchronized = useSelector(userSelectors.isUserSynchronized);
  const productsTableData = useSelector(productsSelectors.productsTableData);
  const productsDateFilter = useSelector(productsSelectors.productsDateFilter);

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
      if (mountedRef.current) {
        setIsLoading(false);
      } // if
    });
  };

  // Начальная загрузка таблицы
  useEffect(() => {
    mountedRef.current = true;

    if (isUserSynchronized && productsTableData.length === 0) {
      loadData(productsDateFilter.date_from, productsDateFilter.date_to);
    } // if

    return () => {
      mountedRef.current = false;
    };
  }, [isUserSynchronized]);

  return (
    <ContentWrapper>
      <Row gutter={[0, 24]} justify={'space-between'}>
        <Col span={18}>
          <DashboardTitle title={'Товары'} text={'Полная информация о каждом из ваших товаров'} />

          <Card className={'order-feed-filters'}>
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <Title level={2}>Выберите период</Title>
              </Col>

              <Col span={24}>
                <DateRangePicker
                  title={'Показать товары за'}
                  value={productsDateFilter}
                  disabled={!isUserSynchronized}
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
              </Col>
            </Row>
          </Card>
        </Col>

        <Col>
          <img src={Images.Dashboards.ProductsLogo} width={'auto'} height={140} alt="products-logo" />
        </Col>

        <Col span={24}>
          <ProductsTable isLoading={isLoading} />
        </Col>
      </Row>
    </ContentWrapper>
  );
};

export default Products;
