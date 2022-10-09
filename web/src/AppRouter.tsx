import { Spin } from 'antd';
import React, { FC, lazy, Suspense, useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { APP_ROUTES } from './constants/routes';

export const AppRouter: FC = (): JSX.Element => {
  const HOME_PAGE = useMemo(() => lazy(() => import('./pages/home')), []);
  const SIGNIN_PAGE = useMemo(() => lazy(() => import('./pages/signin')), []);

  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route path={APP_ROUTES.home.path} component={HOME_PAGE} exact />
        <Route path={APP_ROUTES.signin.path} component={SIGNIN_PAGE} exact />
      </Switch>
    </Suspense>
  );
};
