import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { SorterResult } from 'antd/lib/table/interface';
import './styles.scss';

type Props<TData extends object> = {
  rowKey: keyof TData;
  columns: ColumnsType<TData>;
  dataSource: TData[];
  pagination: {
    pageSize: number;
    total: number;
  };
  isLoading: boolean;
  onChange?: (sorter: SorterResult<TData> | SorterResult<TData>[]) => void;
  summary?: (data: readonly TData[]) => React.ReactNode;
};

export const DataTable = <TData extends object>({
  rowKey,
  columns,
  dataSource,
  pagination,
  isLoading,
  onChange,
  summary,
}: Props<TData>): React.ReactElement => {
  const body = document.getElementsByTagName('body')[0];
  const tableRef = React.createRef<HTMLDivElement>();
  const [needStickyScroll, setNeedStickyScroll] = useState(true);

  useEffect(() => {
    if (tableRef.current) {
      const tableBottomPosition = tableRef.current?.getBoundingClientRect().bottom;
      const bodyBottomPosition = body.getBoundingClientRect().bottom;
      setNeedStickyScroll(dataSource.length !== 0 && tableBottomPosition > bodyBottomPosition);
    } // if
  }, [dataSource]);

  return (
    <div ref={tableRef}>
      <Table
        rowKey={rowKey as string}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          ...pagination,
          showSizeChanger: false,
          position: ['bottomRight'],
        }}
        loading={isLoading}
        onChange={(pagination, filers, sorter, extra) => onChange && onChange(sorter)}
        summary={summary}
        scroll={{ x: 'max-content' }}
        sticky={
          needStickyScroll
            ? {
                offsetHeader: 70,
                offsetScroll: 5,
                offsetSummary: 5,
              }
            : false
        }
      />
    </div>
  );
};
