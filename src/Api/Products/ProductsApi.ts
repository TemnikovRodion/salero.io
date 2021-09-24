import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import { GetProductsRequest, GetProductsResponse, GetProductsExcelRequest } from './';

const url = ApiRouting.createApiUrl('products');

const get = (request: GetProductsRequest): Promise<BaseResponse<GetProductsResponse>> => {
  return rest.getRequest(url, request);
};

const getExcel = (request: GetProductsExcelRequest): Promise<string> => {
  return rest.getRequest(`${url}/excel`, request, true);
};

export const ProductsApi = {
  get,
  getExcel,
};
