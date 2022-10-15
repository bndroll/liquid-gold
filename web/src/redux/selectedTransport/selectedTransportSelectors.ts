import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { TSelectedTransportState } from './selectedTransportTypes';

const selectedTransportState = (state: RootState): TSelectedTransportState =>
  state.selectedTransport;

export const selecteSelectedTransport = createSelector(
  selectedTransportState,
  (selectedTransportState) => selectedTransportState.data
);
