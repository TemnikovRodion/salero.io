import { BaseResponse } from '@/Api';
import { AlertsApi, GetAlertsRequest, GetAlertsResponse } from '@/Api/Alerts';
import { createAsyncThunk } from '@reduxjs/toolkit';

const get = createAsyncThunk<BaseResponse<GetAlertsResponse>, GetAlertsRequest>(
  'alerts/get',
  async (request: GetAlertsRequest) => {
    return AlertsApi.get(request);
  },
);

export const alertsAsyncThunks = {
  get,
};
