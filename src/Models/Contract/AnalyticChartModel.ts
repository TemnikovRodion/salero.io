import { ChartUnit } from '../Enums';
import { ChartLineType } from '../Types';

export type AnalyticChartModel = {
  chartUnit: ChartUnit;
  chartData: ChartLineType[];
};
