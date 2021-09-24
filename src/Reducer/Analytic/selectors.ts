import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const analyticSelector = (state: RootState) => state.analytic;

const analyticTableData = createSelector(analyticSelector, (state) => state.analyticTableData);

const analyticChartData = createSelector(analyticSelector, (state) => state.analyticChartData);

const analyticSummaryData = createSelector(analyticSelector, (state) => state.analyticSummaryData);

const analyticStatisticData = createSelector(analyticSelector, (state) => state.analyticStatisticData);

export const analyticSelectors = {
  analyticTableData,
  analyticSummaryData,
  analyticStatisticData,
  analyticChartData,
};
