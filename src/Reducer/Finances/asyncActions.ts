import { BaseResponse } from '@/Api';
import { FinancesApi, GetFinancesRequest, GetFinancesResponse } from '@/Api/Finances';
import { createAsyncThunk } from '@reduxjs/toolkit';

const get = createAsyncThunk<BaseResponse<GetFinancesResponse>, GetFinancesRequest>(
  'finances/get',
  async (request: GetFinancesRequest) => {
    return FinancesApi.get(request);
  },
);

export const financesAsyncThunks = {
  get,
};
