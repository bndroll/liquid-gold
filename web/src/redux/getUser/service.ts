import { TUserRes } from '../../types/user';
import { Http } from '../../utils/http';

export const getUser = async (): Promise<TUserRes> => {
  const res = await Http.get<TUserRes>('/user/find/me');
  return res.data;
};

export const getUserById = async (id: number): Promise<any> => {
  const res = await Http.get<any>(`/user/${id}`);
  return res.data;
};
