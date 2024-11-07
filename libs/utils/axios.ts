import axios, { AxiosInstance } from 'axios';
import { HttpException } from '../models';

const api = (baseUrl: string, token = ''): AxiosInstance => {
  const api = axios.create();
  api.defaults.baseURL = baseUrl;
  if (token)
    api.defaults.headers.common = {
      Authorization: token,
      'Content-Type': 'application/json',
    };
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      const { response } = err;
      return Promise.reject(new HttpException(response.data, response.status));
    }
  );

  return api;
};

export const genericHttpConsumer = () => {
  return api('');
};

export const cozeApiConsumerV1 = () => {
  return api(
    'https://api.coze.com/v1',
    'Bearer ' + process.env.COZE_ACCESS_TOKEN
  );
};

export const cozeApiConsumerV3 = () => {
  return api(
    'https://api.coze.com/v3',
    'Bearer ' + process.env.COZE_ACCESS_TOKEN
  );
};
