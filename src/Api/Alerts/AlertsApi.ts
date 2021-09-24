import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import { GetAlertsRequest, GetAlertsResponse } from './';

const url = ApiRouting.createApiUrl('alerts');

const get = (request: GetAlertsRequest): Promise<BaseResponse<GetAlertsResponse>> => {
  return rest.getRequest(url, request);
};

export const AlertsApi = {
  get,
};
