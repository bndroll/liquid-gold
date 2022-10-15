import { TAppRoute } from './declarations';

type TRoutesKeys =
  | 'home'
  | 'signin'
  | 'createTicketMain'
  | 'createTicketTransport';

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
};
