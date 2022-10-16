import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { TGetUserByIdState } from './getUserByIdTypes';

const getUserByIdState = (state: RootState): TGetUserByIdState =>
  state.getUserById;

export const selectUserById = createSelector(
  getUserByIdState,
  (getUserByIdState) => getUserByIdState.data
);
