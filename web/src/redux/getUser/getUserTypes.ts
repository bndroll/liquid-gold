import { TUserRes } from '../../types/user';

export type TUserState = {
  error: boolean;
  loading: boolean;
  data?: TUserRes;
};
