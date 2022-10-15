import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTicket } from '../../types/tickets';
import { TGetMyTicketsState } from './getMyTicketsTypes';

const INITIAL_STATE: TGetMyTicketsState = {
  loading: false,
  error: false,
  data: [],
};

const getMyTicketsSlice = createSlice({
  name: 'getMyTickets',
  initialState: INITIAL_STATE,
  reducers: {
    getMyTicketsRequest(state, _action: PayloadAction<any>): void {
      state.loading = true;
    },
    getMyTicketsSuccess(state, action: PayloadAction<TTicket[]>): void {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { getMyTicketsRequest, getMyTicketsSuccess } =
  getMyTicketsSlice.actions;
export const getMyTicketsReducer = getMyTicketsSlice.reducer;
