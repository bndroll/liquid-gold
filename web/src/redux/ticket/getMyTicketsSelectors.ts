import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { TGetMyTicketsState } from './getMyTicketsTypes';

const myTicketsState = (state: RootState): TGetMyTicketsState =>
  state.getMyTickets;

export const selectMyTickets = createSelector(
  myTicketsState,
  (myTicketsState) => myTicketsState.data
);
