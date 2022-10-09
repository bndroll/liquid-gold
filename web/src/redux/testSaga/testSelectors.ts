import { createSelector } from 'reselect';
import { RootState } from '../rootReducer';
import { TTestState } from './testTypes';

const testState = (state: RootState): TTestState => state.test;

export const selectTestData = createSelector(
  testState,
  (testState) => testState.data
);
