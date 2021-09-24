import { rest, BaseResponse } from '@/Api';
import { ApiRouting } from '@/Routing';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendResetPasswordEmailRequest,
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  SendEmailRequest,
  ChangePasswordRequest,
  CheckPasswordRequest,
  ResetPasswordRequest,
} from './';

const url = ApiRouting.createApiUrl('auth');

const login = (request: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  return rest.postRequest(`${url}/login`, request);
};

const register = (request: RegisterRequest): Promise<BaseResponse<RegisterResponse>> => {
  return rest.postRequest(`${url}/register`, request);
};

const logout = (): Promise<void> => {
  return rest.deleteRequest(`${url}/logout`);
};

const sendEmail = (request: SendEmailRequest): Promise<BaseResponse<void>> => {
  return rest.postRequest(`${url}/send_confirm`, request);
};

const confirmEmail = (request: ConfirmEmailRequest): Promise<BaseResponse<ConfirmEmailResponse>> => {
  return rest.postRequest(`${url}/confirm`, request);
};

const sendResetPasswordEmail = (request: SendResetPasswordEmailRequest): Promise<BaseResponse<void>> => {
  return rest.postRequest(`${url}/restore`, request);
};

const changePassword = (request: ChangePasswordRequest): Promise<BaseResponse<void>> => {
  return rest.postRequest(`${url}/password_change`, request);
};

const checkPassword = (request: CheckPasswordRequest): Promise<BaseResponse<void>> => {
  return rest.postRequest(`${url}/password_check`, request);
};

const resetPassword = (uuid: string, request: ResetPasswordRequest): Promise<BaseResponse<void>> => {
  return rest.postRequest(`${url}/restore/${uuid}`, request);
};

export const AuthorizationApi = {
  login,
  register,
  logout,
  confirmEmail,
  sendEmail,
  sendResetPasswordEmail,
  changePassword,
  checkPassword,
  resetPassword,
};
