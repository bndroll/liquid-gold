import React, { useEffect } from 'react';
import { GlobalStyles } from './globalStyles';
import 'antd/dist/antd.css';
import { Router } from 'react-router';
import history from './history';
import { AppRouter } from './AppRouter';
import { ACCESS_TOKEN } from './constants/constants';
import { APP_ROUTES } from './constants/routes';
import { useSelector } from 'react-redux';
import { selectAccessToken } from './redux/auth/authSelectors';
import { useDispatch } from 'react-redux';
import { getUserRequest } from './redux/getUser/getUserSlice';
import { getAllTransportRequest } from './redux/getAllTransport/getAllTransportSlice';

const App: React.FC = (): JSX.Element => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      history.push(APP_ROUTES.home.path);
      dispatch(getUserRequest());
      dispatch(getAllTransportRequest());
    }
  }, [accessToken]);

  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      history.push(APP_ROUTES.signin.path);
    } else {
      dispatch(getUserRequest());
      dispatch(getAllTransportRequest());
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router history={history}>
        <AppRouter />
      </Router>
    </>
  );
};

export default App;
