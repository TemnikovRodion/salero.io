import { AnalyticChartModel, AnalyticModel } from '@/Models/Contract';

export type GetAnalyticResponse = {
  analytic_chart_data: AnalyticChartModel[];
  analytic_table_data: AnalyticModel[];
};
