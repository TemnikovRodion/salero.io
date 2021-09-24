import { BaseResponse } from '@/Api';
import {
  GetWarehousesRequest,
  GetWarehousesResponse,
  GetWarehousesSummaryRequest,
  GetWarehousesSummaryResponse,
  GetWarehousesExcelRequest,
  WarehousesApi,
} from '@/Api/Warehouses';
import { createAsyncThunk } from '@reduxjs/toolkit';

const get = createAsyncThunk<BaseResponse<GetWarehousesResponse>, GetWarehousesRequest>(
  'warehouses/get',
  async (request) => {
    return WarehousesApi.get(request);
  },
);

const getSummary = createAsyncThunk<BaseResponse<GetWarehousesSummaryResponse>, GetWarehousesSummaryRequest>(
  'warehouses/get-summary',
  async (request: GetWarehousesSummaryRequest) => {
    return WarehousesApi.getSummary(request);
  },
);

const getExcel = createAsyncThunk<string, GetWarehousesExcelRequest>(
  'warehouses/get-excel',
  async (request: GetWarehousesExcelRequest) => {
    return WarehousesApi.getExcel(request);
  },
);

export const warehousesAsyncThunks = {
  get,
  getSummary,
  getExcel,
};
