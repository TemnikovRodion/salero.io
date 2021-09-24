import React, { useEffect, useMemo, useState } from 'react';
import { DataTable, ProductCategoriesGroup, SearchInput } from '@/Components';
import { AnalyticModel } from '@/Models/Contract';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/Reducer/User/selectors';
import { AppDispatch } from '@/Reducer/Store';
import { useAnalyticColumnsInfo } from './config';
import { Col, Row } from 'antd';
import { Title } from '@/Components/_Common';
import { analyticTestData } from '@/Mocks';
import { analyticSelectors } from '@/Reducer/Analytic/selectors';
import { ProductCategory } from '@/Models/Enums';
import './styles.scss';

type Props = {};

const AnalyticTableComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const analyticTableData = useSelector(analyticSelectors.analyticTableData);

  // Фильтры таблицы
  const [searchValue, setSearchValue] = useState('');
  const [selectedProductCategories, setSelectedProductCategories] = useState<ProductCategory[]>([]);

  // Загрузка данных для таблицы
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isUserStoreConnected && analyticTableData.length === 0) {
      //setIsLoading(true);
      //dispatch(analyticAsyncActions.getTable({  })).then(() => {
      //  setIsLoading(false);
      //});
    } // if
  }, []);

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    return isUserStoreConnected ? analyticTableData : analyticTestData;
  }, [analyticTableData, isUserStoreConnected]);

  // Cтолбцы таблицы
  const columns = useAnalyticColumnsInfo(tableDataSource.length);

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Row gutter={[15, 0]} align={'middle'} justify={'space-between'}>
          <Col xl={5} xxl={4}>
            <Title level={4}>Статистика товара</Title>

            {!isUserStoreConnected && (
              <Title color={'red'} level={5}>
                {'*данные являются тестовыми'}
              </Title>
            )}
          </Col>

          <Col xl={11} xxl={14}>
            <SearchInput placeholder={'Поиск по штрихкоду или названию'} onChange={(value) => setSearchValue(value)} />
          </Col>

          <Col>
            <ProductCategoriesGroup onChange={(values) => setSelectedProductCategories(values)} />
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <DataTable<AnalyticModel>
          rowKey={'nmid'}
          columns={columns}
          dataSource={tableDataSource.filter(
            (item) =>
              (item.nmid.toLowerCase().includes(searchValue) || item.name.toLowerCase().includes(searchValue)) &&
              selectedProductCategories.includes(item.rating),
          )}
          pagination={{
            pageSize: 50,
            total: tableDataSource.length,
          }}
          isLoading={isLoading}
        />
      </Col>
    </Row>
  );
};

export const AnalyticTable = React.memo(AnalyticTableComponent);
