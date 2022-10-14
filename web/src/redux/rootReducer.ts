import { PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authReducer } from './auth/authSlice';
import { testReducer } from './testSaga/testSlice';

const appReducer = combineReducers({
  test: testReducer,
  auth: authReducer,
});

const rootReducer = (state: any, action: PayloadAction<any>) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
