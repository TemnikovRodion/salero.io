import { ChartUnit } from '../Enums';
import { ChartLineType } from '../Types';

export type OrderFeedChartModel = {
  chart_unit: ChartUnit;
  chart_data: ChartLineType[];
};
