import React, { useMemo } from 'react';
import { Dropdown, Row, Col, List, Badge } from 'antd';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { Text, Title } from '@/Components/_Common';
import { DescriptionType } from '@/Models/Enums';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import moment from 'moment';
import { alertsSelectors } from '@/Reducer/Alerts/selectors';
import { alertsTestData } from '@/Mocks';
import { DateFormats } from '@/Constants/DateFormats';
import './styles.scss';

export const HeaderAlerts = (): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const alertsTableData = useSelector(alertsSelectors.alertsTableData);

  // Данные для списка
  // Если не подключен магазин - отдаем тестовые данные
  const listDataSource = useMemo(() => {
    return isUserStoreConnected ? alertsTableData : alertsTestData;
  }, [alertsTableData, isUserStoreConnected]);

  const dropdownItems = (
    <>
      <Row style={{ background: '#fff' }}>
        <Col span={24}>
          <Row>
            <List
              size="small"
              className={'header-alerts-list'}
              header={<Title level={4}>{'Оповещения'}</Title>}
              footer={
                <Row justify={'center'}>
                  <a style={{ fontWeight: 500, fontSize: 14 }} onClick={(e) => e.preventDefault()}>
                    Показать еще <DownOutlined />
                  </a>
                </Row>
              }
              bordered
              dataSource={listDataSource}
              renderItem={(item) => (
                <List.Item>
                  <Row justify="center" align={'middle'}>
                    <Col>
                      <img alt={item.product_name} src={item.product_image} className={'header-alerts-image'} />
                    </Col>
                    <Col>
                      <Row>
                        <Text color={'gray'}>{moment(item.alert_date).format(DateFormats.TableDateFormat)}</Text>
                      </Row>

                      <Row>
                        <Text color={item.description_type === DescriptionType.ProductEnd ? 'red' : 'black'}>
                          {item.description}
                        </Text>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Row>
        </Col>
      </Row>
    </>
  );

  return (
    <Dropdown trigger={['click']} overlay={dropdownItems}>
      <div className={'header-alerts'}>
        <Badge dot={true}>
          <BellOutlined className={'header-alerts-icon'} />
        </Badge>
      </div>
    </Dropdown>
  );
};
