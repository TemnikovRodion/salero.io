import React, { useMemo, useState } from 'react';
import { DataTable, DownloadButton, PageSizeSelect, SearchInput } from '@/Components';
import { FinanceModel } from '@/Models/Contract';
import { useFinancesColumnsInfo } from './config';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { Card, Col, Row } from 'antd';
import { Text, Title } from '@/Components/_Common';
import { financesSelectors } from '@/Reducer/Finances/selectors';
import { financesSummaryTestData, financesTestData } from '@/Mocks';
import moment from 'moment';
import { DateFormats } from '@/Constants/DateFormats';
import './styles.scss';

type Props = {
  isLoading: boolean;
};

const FinancesTableComponent = ({ isLoading }: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const financesTableData = useSelector(financesSelectors.financesTableData);
  const financesSummaryData = useSelector(financesSelectors.financesSummaryData);
  const financesDateFilter = useSelector(financesSelectors.financesDateFilter);

  // Фильтры таблицы
  const [pageSize, setPageSize] = useState(100);
  const [searchValue, setSearchValue] = useState('');

  // Cтолбцы таблицы
  const columns = useFinancesColumnsInfo();

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    return isUserStoreConnected && financesSummaryData
      ? [
          {
            ...financesSummaryData,
            barcode: 'total-system',
            product_name: 'По всем товарам',
          },
          ...financesTableData,
        ]
      : [
          {
            ...financesSummaryTestData,
            barcode: 'total-system',
            product_name: 'По всем товарам',
          },
          ...financesTestData,
        ];
  }, [financesTableData, financesSummaryData, isUserStoreConnected]);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <Row align={'middle'} justify={'space-between'}>
            <Col>
              <Title level={4}>{'Финансовый отчет по товарам'}</Title>
              <Text>{`За ${moment(financesDateFilter.date_from).format(DateFormats.TextShortDateFormat)} - ${moment(
                financesDateFilter.date_to,
              ).format(DateFormats.TextShortDateFormat)}`}</Text>
            </Col>

            <Col span={8}>
              <SearchInput placeholder={'Поиск по названию'} onChange={(value) => setSearchValue(value)} />
            </Col>

            <Col span={5}>
              <PageSizeSelect value={String(pageSize)} onChange={(value) => setPageSize(Number(value))} />
            </Col>

            <Col>
              <DownloadButton
                text={'Excel'}
                disabled={!isUserStoreConnected}
                onClick={() => console.log('Запросил файл')}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <DataTable<FinanceModel>
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
            isLoading={isLoading}
          />
        </Card>
      </Col>
    </Row>
  );
};

export const FinancesTable = React.memo(FinancesTableComponent);
