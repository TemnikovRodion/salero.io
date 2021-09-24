import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import {
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  SetStoreKeyRequest,
  GetUserResponse,
  SetStoreKeyResponse,
} from './';

const url = ApiRouting.createApiUrl('users');

const get = (): Promise<BaseResponse<GetUserResponse>> => {
  return rest.getRequest(`${url}`);
};

const update = (request: UpdateUserRequest): Promise<BaseResponse<UpdateUserResponse>> => {
  return rest.putRequest(`${url}`, request);
};

const updateProfile = (request: UpdateUserProfileRequest): Promise<BaseResponse<UpdateUserProfileResponse>> => {
  return rest.putRequest(`${url}/profile`, request);
};

const setStoreKey = (request: SetStoreKeyRequest): Promise<BaseResponse<SetStoreKeyResponse>> => {
  return rest.postRequest(`${url}/store_key`, request);
};

export const UserApi = {
  get,
  update,
  updateProfile,
  setStoreKey,
};
