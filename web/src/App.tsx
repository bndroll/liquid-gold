import React from 'react';
import { GlobalStyles } from './globalStyles';
import 'antd/dist/antd.css';
import { Router } from 'react-router';
import history from './history';
import { AppRouter } from './AppRouter';

const App: React.FC = (): JSX.Element => {
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
