import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { TUserState } from './getUserTypes';

const getUserState = (state: RootState): TUserState => state.getUser;

export const selectUser = createSelector(
  getUserState,
  (getUserState) => getUserState.data
);
