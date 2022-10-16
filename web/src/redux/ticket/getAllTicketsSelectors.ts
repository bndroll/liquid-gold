import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { TGetAllTicketsState } from './getAllTicketsTypes';
import { TGetMyTicketsState } from './getMyTicketsTypes';

const allTicketsState = (state: RootState): TGetAllTicketsState =>
  state.getAllTickets;

export const selectAllTickets = createSelector(
  allTicketsState,
  (allTicketsState) => allTicketsState.data
);
