import { BaseResponse } from '@/Api';
import { OrderFeedApi, GetOrderFeedRequest, GetOrderFeedResponse, GetOrderFeedExcelRequest } from '@/Api/OrderFeed';
import { createAsyncThunk } from '@reduxjs/toolkit';

const get = createAsyncThunk<BaseResponse<GetOrderFeedResponse>, GetOrderFeedRequest>(
  'order-feed/get',
  async (request: GetOrderFeedRequest) => {
    return OrderFeedApi.get(request);
  },
);

const getExcel = createAsyncThunk<string, GetOrderFeedExcelRequest>(
  'order-feed/get-excel',
  async (request: GetOrderFeedExcelRequest) => {
    return OrderFeedApi.getExcel(request);
  },
);

export const orderFeedAsyncThunks = {
  get,
  getExcel,
};
