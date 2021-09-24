import React, { useMemo } from 'react';
import { DataTable } from '@/Components';
import { AutodeliveryModel } from '@/Models/Contract';
import { useAutodeliveryColumnsInfo } from './config';
import { useSelector } from 'react-redux';
import { autodeliverySelectors } from '@/Reducer/Autodelivery/selectors';
import { userSelectors } from '@/Reducer/User/selectors';
import { autodeliveryTestData } from '@/Mocks';
import './styles.scss';

type Props = {};

const AutoDeliveryTableComponent = ({}: Props): React.ReactElement => {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const autodeliveryTableData = useSelector(autodeliverySelectors.autodeliveryTableData);

  // Столбцы таблицы
  const columns = useAutodeliveryColumnsInfo();

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    return isUserStoreConnected ? autodeliveryTableData : autodeliveryTestData;
  }, [autodeliveryTableData, isUserStoreConnected]);

  return (
    <DataTable<AutodeliveryModel>
      columns={columns}
      dataSource={tableDataSource}
      isLoading={false}
      pagination={{
        pageSize: 50,
        total: tableDataSource.length,
      }}
      rowKey={'barcode'}
    />
  );
};

export const AutoDeliveryTable = React.memo(AutoDeliveryTableComponent);
