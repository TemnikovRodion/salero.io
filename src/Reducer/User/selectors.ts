import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const userSelector = (state: RootState) => state.user;

const user = createSelector(userSelector, (state) => state.user);

const userStoreKey = createSelector([user], (user) => user?.store_keys?.[0]?.key);

const userSubscription = createSelector([user], (user) => user?.subscription);

const isUserSynchronized = createSelector([user], (user) => user?.meta.is_synchronized);

const isUserStoreConnected = createSelector([user], (user) => (user ? Boolean(user.store_keys?.[0]) : null));

const isUserAdmin = createSelector([user], (user) => Boolean(user?.role.title === 'Admin'));

const dataLoadingStatus = createSelector(userSelector, (state) => state.dataLoadingStatus);

export const userSelectors = {
  user,
  userStoreKey,
  userSubscription,
  isUserSynchronized,
  isUserStoreConnected,
  isUserAdmin,
  dataLoadingStatus,
};
