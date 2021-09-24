import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const subscriptionPlansSelector = (state: RootState) => state.subscriptionPlans;

const subscriptionPlans = createSelector(subscriptionPlansSelector, (state) => state.subscriptionPlans);

export const subscriptionPlansSelectors = {
  subscriptionPlans,
};
