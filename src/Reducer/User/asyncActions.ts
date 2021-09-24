import {
  AuthorizationApi,
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  LoginRequest,
  LoginResponse,
  SendResetPasswordEmailRequest,
  RegisterRequest,
  SendEmailRequest,
  RegisterResponse,
  ChangePasswordRequest,
  CheckPasswordRequest,
} from '@/Api/Authorization';
import { BaseResponse } from '@/Api/BaseResponse';
import {
  GetUserResponse,
  SetStoreKeyRequest,
  SetStoreKeyResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserApi,
} from '@/Api/User';
import { createAsyncThunk } from '@reduxjs/toolkit';

const login = createAsyncThunk<BaseResponse<LoginResponse>, LoginRequest>(
  'user/login',
  async (request: LoginRequest) => {
    return AuthorizationApi.login(request);
  },
);

const register = createAsyncThunk<BaseResponse<RegisterResponse>, RegisterRequest>(
  'user/register',
  async (request: RegisterRequest) => {
    return AuthorizationApi.register(request);
  },
);

const logout = createAsyncThunk<void, void>('user/logout', async () => {
  return AuthorizationApi.logout();
});

const sendEmail = createAsyncThunk<BaseResponse<void>, SendEmailRequest>(
  'user/send-email',
  async (request: SendEmailRequest) => {
    return AuthorizationApi.sendEmail(request);
  },
);

const sendResetPasswordEmail = createAsyncThunk<BaseResponse<void>, SendResetPasswordEmailRequest>(
  'user/send-reset-password-email',
  async (request: SendResetPasswordEmailRequest) => {
    return AuthorizationApi.sendResetPasswordEmail(request);
  },
);

const confirmEmail = createAsyncThunk<BaseResponse<ConfirmEmailResponse>, ConfirmEmailRequest>(
  'user/confirm-email',
  async (request: ConfirmEmailRequest) => {
    return AuthorizationApi.confirmEmail(request);
  },
);

const get = createAsyncThunk<BaseResponse<GetUserResponse>, void>('user/get', async () => {
  return UserApi.get();
});

const update = createAsyncThunk<BaseResponse<UpdateUserResponse>, UpdateUserRequest>(
  'user/update',
  async (request: UpdateUserRequest) => {
    return UserApi.update(request);
  },
);

const updateProfile = createAsyncThunk<BaseResponse<UpdateUserProfileResponse>, UpdateUserProfileRequest>(
  'user/update-profile',
  async (request: UpdateUserProfileRequest) => {
    return UserApi.updateProfile(request);
  },
);

const changePassword = createAsyncThunk<BaseResponse<void>, ChangePasswordRequest>(
  'user/change-password',
  async (request: ChangePasswordRequest) => {
    return AuthorizationApi.changePassword(request);
  },
);

const setStoreKey = createAsyncThunk<BaseResponse<SetStoreKeyResponse>, SetStoreKeyRequest>(
  'user/store-key',
  async (request: SetStoreKeyRequest) => {
    return UserApi.setStoreKey(request);
  },
);

const checkPassword = createAsyncThunk<BaseResponse<void>, CheckPasswordRequest>(
  'user/check-password',
  async (request: CheckPasswordRequest) => {
    return AuthorizationApi.checkPassword(request);
  },
);

const resetPassword = createAsyncThunk<BaseResponse<void>, { uuid: string; request: CheckPasswordRequest }>(
  'user/reset-password',
  async ({ uuid, request }) => {
    return AuthorizationApi.resetPassword(uuid, request);
  },
);

export const userAsyncThunks = {
  login,
  register,
  logout,
  sendEmail,
  confirmEmail,
  sendResetPasswordEmail,
  update,
  updateProfile,
  changePassword,
  setStoreKey,
  get,
  checkPassword,
  resetPassword,
};
