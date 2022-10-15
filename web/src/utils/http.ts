import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_TOKEN } from '../constants/constants';

const instance = axios.create();

instance.defaults.baseURL = 'http://localhost:8080/';
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

export class Http {
  static get<T>(url: string): Promise<AxiosResponse<T>> {
    return instance.get<T>(url);
  }

  static post<T>(url: string, data: any): Promise<AxiosResponse<T, any>> {
    return instance.post<T>(url, data);
  }

  static put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    return instance.put<T>(url, data);
  }

  static _delete<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    return instance.delete<T>(url);
  }
}
