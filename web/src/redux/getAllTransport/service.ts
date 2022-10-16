import { TTransport } from '../../types';
import { Http } from '../../utils/http';

export const getAllTransport = async (): Promise<TTransport[]> => {
  const res = await Http.get<TTransport[]>('/transport');
  return res.data;
};

export const getTransportById = async (id: number): Promise<TTransport> => {
  const res = await Http.get<TTransport>(`/transport/${id}`);
  return res.data;
};
