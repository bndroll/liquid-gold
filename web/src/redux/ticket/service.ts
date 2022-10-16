import { TCreateTicketReq, TTicket } from '../../types/tickets';
import { Http } from '../../utils/http';

export const createTicket = async (data: TCreateTicketReq): Promise<any> => {
  const res = await Http.post<any>('/ticket', data);
  return res.data;
};

export const getMyTickets = async (): Promise<TTicket[]> => {
  const res = await Http.get<TTicket[]>('/ticket/find/my-orders');
  return res.data;
};

export const getAllTickets = async (): Promise<TTicket[]> => {
  const res = await Http.get<TTicket[]>('/ticket');
  return res.data;
};

export const closeTicket = async (id: number): Promise<any> => {
  const res = await Http.patch<any>(`/ticket/${id}/close`, {});
  return res.data;
};
