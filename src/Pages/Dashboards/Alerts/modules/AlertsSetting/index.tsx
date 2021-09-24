import React, { useMemo } from 'react';
import { DataTable } from '@/Components';
import { useAlertsSettingColumnsInfo } from './config';
import { AlertSettingModel } from '@/Models/Contract';
import { useSelector } from 'react-redux';
import { alertsSelectors } from '@/Reducer/Alerts/selectors';
import './styles.scss';

type Props = {};

const AlertsSettingComponent = ({}: Props): React.ReactElement => {
  const alertsSettings = useSelector(alertsSelectors.alertsSettings);

  // Cтолбцы таблицы
  const columns = useAlertsSettingColumnsInfo(() => null);

  // Данные для таблицы
  // Если не подключен магазин - отдаем тестовые данные
  const tableDataSource = useMemo(() => {
    return alertsSettings;
  }, []);

  return (
    <DataTable<AlertSettingModel>
      rowKey={'description_type'}
      columns={columns}
      dataSource={tableDataSource}
      pagination={{
        pageSize: 100,
        total: tableDataSource.length,
      }}
      isLoading={false}
    />
  );
};

export const AlertsSetting = React.memo(AlertsSettingComponent);
