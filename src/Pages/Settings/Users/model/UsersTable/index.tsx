import React, { useMemo, useState } from 'react';
import { DataTable, DownloadButton, PageSizeSelect, SearchInput } from '@/Components';
import { UserModel } from '@/Models/Contract';
import { useUsersColumnsInfo } from './config';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Reducer/Store';
import { Card, Col, Row } from 'antd';
import { Text, Title } from '@/Components/_Common';
import './styles.scss';

type Props = {};

const UsersTableComponent = ({}: Props): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  // Фильтры таблицы
  const [pageSize, setPageSize] = useState(100);
  const [searchValue, setSearchValue] = useState('');

  // Cтолбцы таблицы
  const columns = useUsersColumnsInfo();

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    return {
      items: [],
      total: 100,
    };
  }, [[], searchValue]);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <Row align={'middle'} justify={'space-between'}>
            <Col>
              <Title level={4}>{'Все пользователи'}</Title>
              <Text>{'Нажмите на ссылку чтобы перейти в ЛК'}</Text>
            </Col>

            <Col span={10}>
              <SearchInput placeholder={'Поиск'} onChange={(value) => setSearchValue(value)} />
            </Col>

            <Col span={5}>
              <PageSizeSelect value={String(pageSize)} onChange={(value) => setPageSize(Number(value))} />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <DataTable<UserModel>
            rowKey={'email'}
            columns={columns}
            dataSource={tableDataSource.items}
            pagination={{
              pageSize: pageSize,
              total: tableDataSource.total,
            }}
            isLoading={false}
          />
        </Card>
      </Col>
    </Row>
  );
};

export const UsersTable = React.memo(UsersTableComponent);
