import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const autodeliverySelector = (state: RootState) => state.autodelivery;

const autodeliveryParams = createSelector(autodeliverySelector, (state) => state.autodeliveryParams);

const autodeliveryTableData = createSelector(autodeliverySelector, (state) => state.autodeliveryTableData);

const autodeliverySummaryData = createSelector(autodeliverySelector, (state) => state.autodeliverySummaryData);

const warehouseNames = createSelector(autodeliverySelector, (state) => state.warehouseNames);

export const autodeliverySelectors = {
  autodeliveryParams,
  autodeliveryTableData,
  autodeliverySummaryData,
  warehouseNames,
};
