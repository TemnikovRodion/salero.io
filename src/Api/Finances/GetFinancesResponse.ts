import { FinanceModel, FinanceSummaryModel, FinanceChartModel } from '@/Models/Contract';

export type GetFinancesResponse = {
  finances_chart_data: FinanceChartModel[];
  finances_table_data: FinanceModel[];
  finances_summary_data: FinanceSummaryModel;
};
