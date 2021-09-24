import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import { GetAnalyticRequest, GetAnalyticResponse } from './';

const url = ApiRouting.createApiUrl('analytic');

const get = (request: GetAnalyticRequest): Promise<BaseResponse<GetAnalyticResponse>> => {
  return rest.getRequest(url, request);
};

export const AnalyticApi = {
  get,
};
