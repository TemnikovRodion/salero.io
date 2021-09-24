import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const alertsSelector = (state: RootState) => state.alerts;

const alertsTableData = createSelector(alertsSelector, (state) => state.alertsTableData);

const alertsHeaderData = createSelector(alertsSelector, (state) => state.alertsHeaderData);

const alertsDateFilter = createSelector(alertsSelector, (state) => state.alertsDateFilter);

const alertsSettings = createSelector(alertsSelector, (state) => state.alertsSettings);

export const alertsSelectors = {
  alertsTableData,
  alertsHeaderData,
  alertsDateFilter,
  alertsSettings,
};
