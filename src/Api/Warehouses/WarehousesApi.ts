import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import {
  GetWarehousesRequest,
  GetWarehousesResponse,
  GetWarehousesSummaryRequest,
  GetWarehousesSummaryResponse,
  GetWarehousesExcelRequest,
} from '.';

const url = ApiRouting.createApiUrl('warehouse');

const get = (request: GetWarehousesRequest): Promise<BaseResponse<GetWarehousesResponse>> => {
  return rest.getRequest(url, request);
};

const getSummary = (request: GetWarehousesSummaryRequest): Promise<BaseResponse<GetWarehousesSummaryResponse>> => {
  // Так делать нельзя, на бэке обезьяна
  return rest.postRequest(`${url}?date_from=${request.date_from}&date_to=${request.date_to}`, request);
};

const getExcel = (request: GetWarehousesExcelRequest): Promise<string> => {
  return rest.getRequest(`${url}/excel`, request, true);
};

export const WarehousesApi = {
  get,
  getSummary,
  getExcel,
};
