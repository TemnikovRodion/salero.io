import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import { GetOrderFeedRequest, GetOrderFeedResponse, GetOrderFeedExcelRequest } from './';

const url = ApiRouting.createApiUrl('order_feed');

const get = (request: GetOrderFeedRequest): Promise<BaseResponse<GetOrderFeedResponse>> => {
  return rest.getRequest(url, request);
};

const getExcel = (request: GetOrderFeedExcelRequest): Promise<string> => {
  return rest.getRequest(`${url}/excel`, request, true);
};

export const OrderFeedApi = {
  get,
  getExcel,
};
