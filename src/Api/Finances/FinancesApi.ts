import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import { GetFinancesRequest, GetFinancesResponse } from './';

const url = ApiRouting.createApiUrl('finances');

const get = (request: GetFinancesRequest): Promise<BaseResponse<GetFinancesResponse>> => {
  return rest.getRequest(url, request);
};

export const FinancesApi = {
  get,
};
