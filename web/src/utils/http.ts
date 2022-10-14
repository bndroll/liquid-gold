import axios, { AxiosResponse } from 'axios';

const instance = axios.create();

instance.defaults.baseURL = 'http://localhost:8080/';

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
