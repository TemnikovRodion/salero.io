import React from 'react';
import { Row, Col, Card } from 'antd';
import { ContentWrapper, DashboardTitle, DownloadButton, NoDataBlock } from '@/Components';
import { Text, Title } from '@/Components/_Common';
import { AutoDeliveryFilters, AutoDeliveryTable } from './modules';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { autodeliverySelectors } from '@/Reducer/Autodelivery/selectors';
import { useState } from 'react';
import { useMemo } from 'react';
import { autodeliverySummaryTestData } from '@/Mocks';
import moment from 'moment';
import { stringUtils } from '@/Utils';
import { DateFormats } from '@/Constants/DateFormats';
import './styles.scss';

type Props = {};

const AutoDelivery = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const autodeliverySummaryData = useSelector(autodeliverySelectors.autodeliverySummaryData);
  const autodeliveryParams = useSelector(autodeliverySelectors.autodeliveryParams);

  // Триггер на обновление данных
  const [needToUpdate, setNeedToUpdate] = useState(false);

  // Данные для сводки
  // Если магазин не подключен - отдаем тестовые данные
  const summaryDataSource = useMemo(() => {
    return isUserStoreConnected ? autodeliverySummaryData : autodeliverySummaryTestData;
  }, [autodeliverySummaryData, isUserStoreConnected]);

  return (
    <ContentWrapper>
      <DashboardTitle
        title={'Автопоставка'}
        text={'Рассчитайте какое количество товара вам необходимо поставить на склад'}
      />

      <Card className={'auto-delivery-filters'}>
        <AutoDeliveryFilters />
      </Card>

      <Card>
        <Row gutter={[0, 48]}>
          <Col span={24}>
            <Row justify={'space-between'}>
              <Col span={18}>
                <Title level={4} className={'auto-delivery-table-title'}>
                  {'Товары к поставке'}
                </Title>
                <Text>
                  {'Вы можете убирать лишние товары из конечного файла, снимая галочку в столбце «Добавить в файл»'}
                </Text>
              </Col>

              <Col>
                <DownloadButton
                  text={'Скачать файл поставки'}
                  disabled={!isUserStoreConnected}
                  onClick={() => console.log('Скачал файл поставки')}
                />
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            {summaryDataSource && autodeliveryParams.delivery_date && autodeliveryParams.warehouse_name ? (
              <Row gutter={[0, 24]}>
                <Col sm={6} xl={6} xxl={4}>
                  <Text>{'Склад'}</Text>
                  <Title level={3}>
                    {isUserStoreConnected ? summaryDataSource.watehouse_name : autodeliveryParams.warehouse_name}
                  </Title>
                </Col>

                <Col sm={6} xl={6} xxl={4}>
                  <Text>{'Дата поставки:'}</Text>
                  <Title level={3}>
                    {moment(
                      isUserStoreConnected ? summaryDataSource.delivery_date : autodeliveryParams.delivery_date,
                    ).format(DateFormats.TableDateFormat)}
                  </Title>
                </Col>

                <Col sm={6} xl={6} xxl={4}>
                  <Text>{'Следующая поставка:'}</Text>
                  <Title level={3}>
                    {moment(
                      isUserStoreConnected ? summaryDataSource.next_delivery_date : autodeliveryParams.delivery_date,
                    )
                      .add(7, 'days')
                      .format(DateFormats.TableDateFormat)}
                  </Title>
                </Col>

                <Col sm={6} xl={6} xxl={4}>
                  <Text>{'Поставка закроет дефицит на:'}</Text>
                  <Title level={3}>{stringUtils.getFormattedDay(summaryDataSource.delivery_coverage_days)}</Title>
                </Col>

                <Col span={24}>
                  <AutoDeliveryTable />
                </Col>
              </Row>
            ) : (
              <NoDataBlock
                text={
                  'Заполните поля в блоке «Сформировать товары к поставке» и нажмите на кнопку «Сформировать список товаров»'
                }
              />
            )}
          </Col>
        </Row>
      </Card>
    </ContentWrapper>
  );
};

export default AutoDelivery;
