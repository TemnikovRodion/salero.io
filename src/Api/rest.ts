import { globalHistory } from '@/GlobalHistory';
import { PagesRouting } from '@/Routing';
import { cookieUtils } from '@/Utils';
import { BaseResponse } from './BaseResponse';
import { ResponseStatus } from './ResponseStatus';
import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { ResponseErrors } from './ResponseErrors';

axios.interceptors.response.use(
  function (response) {
    const data = response.data as BaseResponse<void>;

    if (data.status === ResponseStatus.fail) {
      const errorMessage = ResponseErrors[data.message as keyof typeof ResponseErrors] ?? null;
      if (errorMessage) {
        message.error(errorMessage);
      } // if

      if (data.message === 'There is no such user') {
        globalHistory.push(PagesRouting.Auth.Login);
      } // if

      return Promise.reject(response);
    } // if

    return response;
  },
  function (error) {
    const errorMessage = ResponseErrors[error.response.data.message as keyof typeof ResponseErrors] ?? null;
    if (errorMessage) {
      message.error(errorMessage);
    } // if

    if (error.response.status === 401) {
      globalHistory.push(PagesRouting.Auth.Login);
    } // if

    return Promise.reject(error);
  },
);

// GET
const getRequest = async <TResponse>(
  url: string,
  params?: Record<string, any>,
  isFile?: boolean,
): Promise<TResponse> => {
  const auth_cookie = cookieUtils.getCookie(AUTH_COOKIE_NAME);

  const query = params ? qs.stringify(params, { allowDots: true }) : null;
  if (query) {
    url = url + '?' + query;
  } // if

  const result = await axios.get(url, {
    headers: {
      Authorization: auth_cookie ? 'Bearer ' + auth_cookie : '',
      'Cache-Control': 'no-cache',
    },
    responseType: isFile ? 'blob' : undefined,
  });
  return result.data as TResponse;
}; // getRequest

// POST
const postRequest = async <TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> => {
  const auth_cookie = cookieUtils.getCookie(AUTH_COOKIE_NAME);

  const result = await axios.post(url, data, {
    headers: auth_cookie ? { Authorization: 'Bearer ' + auth_cookie } : '',
  });

  return result.data as TResponse;
}; // postRequest

// PUT
const putRequest = async <TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> => {
  const auth_cookie = cookieUtils.getCookie(AUTH_COOKIE_NAME);

  const result = await axios.put(url, data, { headers: auth_cookie ? { Authorization: 'Bearer ' + auth_cookie } : '' });
  return result.data as TResponse;
}; // putRequest

// DELETE
const deleteRequest = async <TResponse>(url: string): Promise<TResponse> => {
  const auth_cookie = cookieUtils.getCookie(AUTH_COOKIE_NAME);

  const result = await axios.delete(url, { headers: auth_cookie ? { Authorization: 'Bearer ' + auth_cookie } : '' });
  return result.data as TResponse;
}; // deleteRequest

export const rest = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
