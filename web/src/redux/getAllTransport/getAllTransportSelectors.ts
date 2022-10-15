import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { TAllTransportState } from './getAllTransportTypes';

const allTransportState = (state: RootState): TAllTransportState =>
  state.getTransport;

export const selectAllTransport = createSelector(
  allTransportState,
  (allTransportState) => allTransportState.data
);

export const selectAllTransportLoading = createSelector(
  allTransportState,
  (allTransportState) => allTransportState.loading
);
