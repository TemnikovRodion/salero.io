import { BaseResponse } from '@/Api';
import { AutodeliveryApi, GetAutodeliveryTableRequest, GetAutodeliveryTableResponse } from '@/Api/Autodelivery';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getTable = createAsyncThunk<BaseResponse<GetAutodeliveryTableResponse>, GetAutodeliveryTableRequest>(
  'autodelivery/get-table',
  async (request: GetAutodeliveryTableRequest) => {
    return AutodeliveryApi.getTable(request);
  },
);

export const autodeliveryAsyncThunks = {
  getTable,
};
