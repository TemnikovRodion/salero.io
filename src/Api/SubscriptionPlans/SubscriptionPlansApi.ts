import { ApiRouting } from '@/Routing';
import { BaseResponse } from '../BaseResponse';
import { GetSubscriptionPlansResponse } from './GetSubscriptionPlansResponse';
import { rest } from '../rest';

const url = ApiRouting.createApiUrl('subscription_plans');

const get = (): Promise<BaseResponse<GetSubscriptionPlansResponse>> => {
  return rest.getRequest(url);
};

export const SubscriptionPlansApi = {
  get,
};
