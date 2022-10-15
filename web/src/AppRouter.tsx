import { Spin } from 'antd';
import React, { FC, lazy, Suspense, useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { APP_ROUTES } from './constants/routes';

export const AppRouter: FC = (): JSX.Element => {
  const HOME_PAGE = useMemo(() => lazy(() => import('./pages/home')), []);
  const SIGNIN_PAGE = useMemo(() => lazy(() => import('./pages/signin')), []);
  const CREATE_TICKET_MAIN_PAGE = useMemo(
    () => lazy(() => import('./pages/createTicketMain')),
    []
  );
  const CREATE_TICKET_TRANSPORT_PAGE = useMemo(
    () => lazy(() => import('./pages/createTicketTransport')),
    []
  );

  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route path={APP_ROUTES.home.path} component={HOME_PAGE} exact />
        <Route path={APP_ROUTES.signin.path} component={SIGNIN_PAGE} exact />
        <Route
          path={APP_ROUTES.createTicketMain.path}
          component={CREATE_TICKET_MAIN_PAGE}
          exact
        />
        <Route
          path={APP_ROUTES.createTicketTransport.path}
          component={CREATE_TICKET_TRANSPORT_PAGE}
          exact
        />
      </Switch>
    </Suspense>
  );
};
