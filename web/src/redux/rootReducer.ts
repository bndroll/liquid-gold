import { PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { testReducer } from './testSaga/testSlice';

const appReducer = combineReducers({
  test: testReducer,
});

const rootReducer = (state: any, action: PayloadAction<any>) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
