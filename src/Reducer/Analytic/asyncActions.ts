import { BaseResponse } from '@/Api';
import { AnalyticApi, GetAnalyticRequest, GetAnalyticResponse } from '@/Api/Analytic';
import { createAsyncThunk } from '@reduxjs/toolkit';

const get = createAsyncThunk<BaseResponse<GetAnalyticResponse>, GetAnalyticRequest>(
  'analytic/get',
  async (request: GetAnalyticRequest) => {
    return AnalyticApi.get(request);
  },
);

export const analyticAsyncThunks = {
  get,
};
