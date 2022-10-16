import { TAppRoute } from './declarations';

type TRoutesKeys =
  | 'home'
  | 'signin'
  | 'createTicketMain'
  | 'createTicketTransport'
  | 'myTickets'
  | 'ticket'
  | 'allTickets';

export const APP_ROUTES: Record<TRoutesKeys, TAppRoute> = {
  home: {
    title: 'Главная',
    path: '/',
  },
  signin: {
    title: 'Вход',
    path: '/login',
  },
  createTicketMain: {
    title: 'Создать заявку',
    path: '/create-ticket-main',
  },
  createTicketTransport: {
    title: 'Создать заявку',
    path: '/create-ticket-transport',
  },
  myTickets: {
    title: 'Мои заявки',
    path: '/my-tickets',
  },
  ticket: {
    title: 'Заявка',
    path: '/ticket/',
  },
  allTickets: {
    title: 'Все заявки',
    path: '/all-tickets',
  },
};
