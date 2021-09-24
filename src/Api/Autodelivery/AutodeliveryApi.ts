import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import { GetAutodeliveryTableRequest, GetAutodeliveryTableResponse } from '.';

const url = ApiRouting.createApiUrl('autodelivery');

const getTable = (request: GetAutodeliveryTableRequest): Promise<BaseResponse<GetAutodeliveryTableResponse>> => {
  return rest.getRequest(url, request);
};

export const AutodeliveryApi = {
  getTable,
};
