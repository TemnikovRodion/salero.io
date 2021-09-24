import { OrderFeedChartModel, OrderFeedModel, OrderFeedSummaryModel } from '@/Models/Contract';

export type GetOrderFeedResponse = {
  chart: OrderFeedChartModel[];
  order_feed: OrderFeedModel[];
  stat: OrderFeedSummaryModel;
};
