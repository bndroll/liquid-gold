import { TTransport } from '../../types';

export type TAllTransportState = {
  error: boolean;
  loading: boolean;
  data: TTransport[];
};
