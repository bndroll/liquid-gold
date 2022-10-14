import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { TAuthState } from './authTypes';

const authState = (state: RootState): TAuthState => state.auth;

export const selectAccessToken = createSelector(
  authState,
  (authState) => authState.data.access_token
);

export const selectAuthLoading = createSelector(
  authState,
  (authState) => authState.loading
);
