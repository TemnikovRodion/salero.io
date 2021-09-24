import React from 'react';
import { Text, Title } from '@/Components/_Common';
import { Col, DatePicker, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { autodeliverySelectors } from '@/Reducer/Autodelivery/selectors';
import { useMemo } from 'react';
import { warehouseNamesTestData } from '@/Mocks';
import { autodeliveryActions } from '@/Reducer/Autodelivery/reducer';
import moment from 'moment';
import { DateFormats } from '@/Constants/DateFormats';
import './styles.scss';

type Props = {};

export const AutoDeliveryFilters = ({}: Props): React.ReactElement => {
  const dispatch = useDispatch();
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const autodeliveryParams = useSelector(autodeliverySelectors.autodeliveryParams);
  const warehouseNames = useSelector(autodeliverySelectors.warehouseNames);

  // Проверка заполнения параметров
  const isAllParamsSelected = autodeliveryParams.warehouse_name && autodeliveryParams.delivery_date;

  // Фильтры автопоставки
  const daysArray = new Array(31).fill(0);
  const warehouseNameOptions = useMemo(() => {
    return isUserStoreConnected ? warehouseNames : warehouseNamesTestData;
  }, [warehouseNames, isUserStoreConnected]);

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Title level={2}>Сформировать товары к поставке</Title>
      </Col>

      <Col span={24}>
        <Row justify={'space-between'} align={'bottom'}>
          <Col span={4}>
            <Row gutter={[0, 8]}>
              <Col span={24}>
                <Text>{'Дата поставки:'}</Text>
              </Col>
              <Col span={24}>
                <DatePicker
                  value={autodeliveryParams.delivery_date ? moment(autodeliveryParams.delivery_date) : undefined}
                  onChange={(value) => {
                    dispatch(
                      autodeliveryActions.setAutodeliveryParams({
                        ...autodeliveryParams,
                        delivery_date: value?.format(DateFormats.RequestDateFormat),
                      }),
                    );
                  }}
                />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row gutter={[0, 8]}>
              <Col span={24}>
                <Text>{'Склад:'}</Text>
              </Col>
              <Col span={24}>
                <Select
                  placeholder={'Выберите склад'}
                  value={autodeliveryParams.warehouse_name}
                  onChange={(value: string) => {
                    dispatch(
                      autodeliveryActions.setAutodeliveryParams({
                        ...autodeliveryParams,
                        warehouse_name: value,
                      }),
                    );

                    if (isAllParamsSelected) {
                    } // if
                  }}
                >
                  {warehouseNameOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row gutter={[0, 8]}>
              <Col span={24}>
                <Text>{'Данные о продажах, дней:'}</Text>
              </Col>
              <Col span={24}>
                <Select
                  disabled={!isUserStoreConnected}
                  value={autodeliveryParams.sale_days}
                  onChange={(value) => {
                    dispatch(
                      autodeliveryActions.setAutodeliveryParams({
                        ...autodeliveryParams,
                        sale_days: value,
                      }),
                    );

                    if (isAllParamsSelected) {
                    } // if
                  }}
                >
                  {daysArray.map((item, idx) => (
                    <Select.Option key={idx} value={idx}>
                      {idx}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row gutter={[0, 8]}>
              <Col span={24}>
                <Text>{'Убрать товары моложе, дней:'}</Text>
              </Col>
              <Col span={24}>
                <Select
                  disabled={!isUserStoreConnected}
                  value={autodeliveryParams.product_age_days}
                  onChange={(value) => {
                    dispatch(
                      autodeliveryActions.setAutodeliveryParams({
                        ...autodeliveryParams,
                        product_age_days: value,
                      }),
                    );

                    if (isAllParamsSelected) {
                    } // if
                  }}
                >
                  {daysArray.map((item, idx) => (
                    <Select.Option key={idx} value={idx}>
                      {idx}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row gutter={[0, 8]}>
              <Col span={24}>
                <Text>{'Необходимый запас на складе, дней:'}</Text>
              </Col>
              <Col span={24}>
                <Select
                  disabled={!isUserStoreConnected}
                  value={autodeliveryParams.commodity_stock_days}
                  onChange={(value) => {
                    dispatch(
                      autodeliveryActions.setAutodeliveryParams({
                        ...autodeliveryParams,
                        commodity_stock_days: value,
                      }),
                    );

                    if (isAllParamsSelected) {
                    } // if
                  }}
                >
                  {daysArray.map((item, idx) => (
                    <Select.Option key={idx} value={idx}>
                      {idx}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
