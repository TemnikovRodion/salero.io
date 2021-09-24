import { SubscriptionPlanModel } from '@/Models/Contract';
import { createSlice } from '@reduxjs/toolkit';
import { subscriptionPlansAsyncThunks as asyncActions } from './asyncActions';

type SubscriptionPlansState = {
  subscriptionPlans: SubscriptionPlanModel[];
};

const initialState: SubscriptionPlansState = {
  subscriptionPlans: [],
};

const subscriptionPlansSlice = createSlice({
  name: 'subscription-plans',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncActions.get.fulfilled, (state, action) => {
      state.subscriptionPlans = action.payload.data.subscription_plans;
    });
  },
});

export const subscriptionPlansReducer = subscriptionPlansSlice.reducer;
export const subscriptionPlansActions = subscriptionPlansSlice.actions;
export const subscriptionPlansAsyncActions = asyncActions;
