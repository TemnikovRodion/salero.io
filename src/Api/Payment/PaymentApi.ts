import { GetPaymentLinkRequest, GetPaymentLinkResponse } from './';
import { BaseResponse, rest } from '../';
import { ApiRouting } from '@/Routing';

const url = ApiRouting.createApiUrl('payment');

const getLink = (request: GetPaymentLinkRequest): Promise<BaseResponse<GetPaymentLinkResponse>> => {
  return rest.postRequest(url, request);
};

export const PaymentApi = {
  getLink,
};
