import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { productsSelectors } from '@/Reducer/Products/selectors';
import { numberUtils } from '@/Utils';
import { useMemo } from 'react';
import { userSelectors } from '@/Reducer/User/selectors';
import { productsSummaryTestData } from '@/Mocks';

export function useProductsTableSummary() {
  const isUserStoreConnected = useSelector(userSelectors.isUserStoreConnected);
  const productsSummaryData = useSelector(productsSelectors.productsSummaryData);

  const summaryDataSource = useMemo(() => {
    return isUserStoreConnected ? productsSummaryData : productsSummaryTestData;
  }, [productsSummaryData, isUserStoreConnected]);

  return (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} />

        <Table.Summary.Cell index={1}>
          <b>По всем товарам</b>
        </Table.Summary.Cell>

        <Table.Summary.Cell index={2} />

        <Table.Summary.Cell index={3} />

        <Table.Summary.Cell index={4}>{numberUtils.getMoneyString(summaryDataSource?.sold_amount)}</Table.Summary.Cell>
        <Table.Summary.Cell index={5} />

        <Table.Summary.Cell index={6}>{numberUtils.getRoundedString(summaryDataSource?.balance, 0)}</Table.Summary.Cell>

        <Table.Summary.Cell index={7} />

        <Table.Summary.Cell index={8} />
        <Table.Summary.Cell index={9} />

        <Table.Summary.Cell index={10} />
        <Table.Summary.Cell index={11} />
        <Table.Summary.Cell index={12}>
          {numberUtils.getMoneyString(summaryDataSource?.balance_cost)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );
}
