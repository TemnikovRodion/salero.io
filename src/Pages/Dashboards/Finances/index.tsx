import React, { useEffect, useState } from 'react';
import { ContentWrapper, DashboardTitle, DateRangePicker } from '@/Components';
import { Title } from '@/Components/_Common';
import { Card, Col, Row } from 'antd';
import { FinancesChart, FinancesTable } from './modules';
import { Images } from '@/Static';
import { productsActions, productsAsyncActions } from '@/Reducer/Products/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { financesSelectors } from '@/Reducer/Finances/selectors';
import { userSelectors } from '@/Reducer/User/selectors';
import './styles.scss';
import { AppDispatch } from '@/Reducer/Store';

type Props = {};

const Finances = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const financesTableData = useSelector(financesSelectors.financesTableData);
  const financesDateFilter = useSelector(financesSelectors.financesDateFilter);

  // Индикатор загрузки данных
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка данных для таблицы и графика
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
    if (isUserStoreConnected && financesTableData.length === 0) {
      loadData(financesDateFilter.date_from, financesDateFilter.date_to);
    } // if
  }, [isUserStoreConnected]);

  return (
    <ContentWrapper>
      <Row justify={'space-between'}>
        <Col span={18}>
          <DashboardTitle title={'Финансы'} text={'Финансовые показатели по вашему магазину и каждому товару.'} />

          <Card className={'finances-filters'}>
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <Title level={2}>Выберите период</Title>
              </Col>

              <Col span={24}>
                <DateRangePicker
                  title={'Показать динамику финансов за'}
                  value={financesDateFilter}
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
              </Col>
            </Row>
          </Card>
        </Col>

        <Col>
          <img alt={'finances-logo'} src={Images.Dashboards.FinancesLogo} width={'auto'} height={140} />
        </Col>
      </Row>

      <Card loading={isLoading}>
        <FinancesChart />
      </Card>

      <Card>
        <FinancesTable isLoading={isLoading} />
      </Card>
    </ContentWrapper>
  );
};

export default Finances;
