import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const financesSelector = (state: RootState) => state.finances;

const financesTableData = createSelector(financesSelector, (state) => state.financesTableData);

const financesChartData = createSelector(financesSelector, (state) => state.financesChartData);

const financesSummaryData = createSelector(financesSelector, (state) => state.financesSummaryData);

const financesDateFilter = createSelector(financesSelector, (state) => state.financesDateFilter);

export const financesSelectors = {
  financesTableData,
  financesChartData,
  financesSummaryData,
  financesDateFilter,
};
