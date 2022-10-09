import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../rootReducer';
import rootSaga from '../rootSaga';

// const composeEnhancers = composeWithDevTools({
//   trace: true,
// });

const sagaMiddlware = createSagaMiddleware();
const middlewares = [sagaMiddlware];

const store = configureStore({
  devTools: true,
  middleware: [...middlewares],
  reducer: rootReducer,
});

sagaMiddlware.run(rootSaga);

export default store;
