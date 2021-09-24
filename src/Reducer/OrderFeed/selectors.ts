import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const orderFeedSelector = (state: RootState) => state.orderFeed;

const orderFeedTableData = createSelector(orderFeedSelector, (state) => state.orderFeedTableData);

const orderFeedChartData = createSelector(orderFeedSelector, (state) => state.orderFeedChartData);

const orderFeedSummaryData = createSelector(orderFeedSelector, (state) => state.orderFeedSummaryData);

const orderFeedDateFilter = createSelector(orderFeedSelector, (state) => state.orderFeedDateFilter);

export const orderFeedSelectors = {
  orderFeedTableData,
  orderFeedChartData,
  orderFeedSummaryData,
  orderFeedDateFilter,
};
