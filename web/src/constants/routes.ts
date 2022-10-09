import { TAppRoute } from './declarations';

type TRoutesKeys = 'home' | 'signin';

export const APP_ROUTES: Record<TRoutesKeys, TAppRoute> = {
  home: {
    title: 'Главная',
    path: '/',
  },
  signin: {
    title: 'Вход',
    path: '/login',
  },
};
