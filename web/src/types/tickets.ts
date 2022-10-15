import { TUserRes } from '.';
import { TTransport } from './transport';

export type TCreateTicketReq = {
  title: string;
  description: string;
  priority: number;
  destination: {
    lat: number;
    lon: number;
  };
  transport: string;
  dateStart: number;
  dateEnd: number;
};

export enum TicketState {
  Open = 'Open',
  Working = 'Working',
  Close = 'Close',
  Rejected = 'Rejected',
}

export const StateToLabelMap = {
  [TicketState.Open]: 'Открыта',
  [TicketState.Working]: 'В работе',
  [TicketState.Close]: 'Закрыта',
  [TicketState.Rejected]: 'Отклонена',
};

type TProrityState = {
  color: string;
  text: string;
};

export function getPriority(priority: number): TProrityState {
  if (priority === 5) {
    return { text: 'Высокий приоритет', color: 'error.main' };
  } else if (priority > 2 && priority <= 4) {
    return { text: 'Средний приоритет', color: 'warning.main' };
  } else {
    return { text: 'Низкий приоритет', color: 'success.main' };
  }
}

export type TTicket = {
  _id: string;
  title: string;
  description: string;
  priority: number;
  destination: {
    lat: number;
    lon: number;
  };
  transport: string;
  driver: string;
  customer: string;
  dateStart: number;
  dateEnd: number;
  createDate: number;
  state: TicketState;
};
