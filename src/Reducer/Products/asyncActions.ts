import { BaseResponse } from '@/Api';
import { GetProductsRequest, GetProductsResponse, GetProductsExcelRequest, ProductsApi } from '@/Api/Products';
import { createAsyncThunk } from '@reduxjs/toolkit';

const get = createAsyncThunk<BaseResponse<GetProductsResponse>, GetProductsRequest>(
  'products/get',
  async (request: GetProductsRequest) => {
    return ProductsApi.get(request);
  },
);

const getExcel = createAsyncThunk<string, GetProductsExcelRequest>(
  'products/get-excel',
  async (request: GetProductsExcelRequest) => {
    return ProductsApi.getExcel(request);
  },
);

export const productsAsyncThunks = {
  get,
  getExcel,
};
