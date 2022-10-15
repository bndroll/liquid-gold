import { TTransport } from '../../types';
import { Http } from '../../utils/http';

export const getAllTransport = async (): Promise<TTransport[]> => {
  const res = await Http.get<TTransport[]>('/transport');
  return res.data;
};
