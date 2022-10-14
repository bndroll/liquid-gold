import { TAuthReq, TAuthRes } from '../../types';
import { Http } from '../../utils/http';

export const makeAuth = async (data: TAuthReq): Promise<TAuthRes> => {
  const res = await Http.post<TAuthRes>('/auth/login', data);
  return res.data;
};
