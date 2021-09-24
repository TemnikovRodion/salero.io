import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const productsSelector = (state: RootState) => state.products;

const productsTableData = createSelector(productsSelector, (state) => state.productsTableData);

const productsSummaryData = createSelector(productsSelector, (state) => state.productsSummaryData);

const productsDateFilter = createSelector(productsSelector, (state) => state.productsDateFilter);

export const productsSelectors = {
  productsTableData,
  productsSummaryData,
  productsDateFilter,
};
