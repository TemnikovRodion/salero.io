import { BaseResponse } from '@/Api';
import { SubscriptionPlansApi, GetSubscriptionPlansResponse } from '@/Api/SubscriptionPlans';
import { createAsyncThunk } from '@reduxjs/toolkit';

const get = createAsyncThunk<BaseResponse<GetSubscriptionPlansResponse>, void>('subscription-plans/get', async () => {
  return SubscriptionPlansApi.get();
});

export const subscriptionPlansAsyncThunks = {
  get,
};
