import { TTicket } from '../../types/tickets';

export type TGetMyTicketsState = {
  loading: boolean;
  error: boolean;
  data: TTicket[];
};
