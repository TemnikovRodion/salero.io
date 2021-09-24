import { ResponseStatus } from './ResponseStatus';

export type BaseResponse<TResponse> = {
  data: TResponse;
  message: string;
  status: ResponseStatus;
};
