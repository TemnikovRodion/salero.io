import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const warehousesSelector = (state: RootState) => state.warehouses;

const warehousesTableData = createSelector(warehousesSelector, (state) => state.warehousesTableData);

const warehousesSummaryData = createSelector(warehousesSelector, (state) => state.warehousesSummaryData);

const warehousesDateFilter = createSelector(warehousesSelector, (state) => state.warehousesDateFilter);

export const warehousesSelectors = {
  warehousesTableData,
  warehousesSummaryData,
  warehousesDateFilter,
};
