import { TTicket } from '../../types/tickets';

export type TGetAllTicketsState = {
  loading: boolean;
  error: boolean;
  data: TTicket[];
};
