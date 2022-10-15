import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCreateTicketReq } from '../../types/tickets';
import { TCreateTicketState } from './createTicketTypes';

const INITIAL_STATE: TCreateTicketState = {
  loading: false,
  error: false,
  data: null,
};

export const createTicketSlice = createSlice({
  name: 'createTicket',
  initialState: INITIAL_STATE,
  reducers: {
    createTicketRequest(state, _action: PayloadAction<TCreateTicketReq>): void {
      state.loading = true;
    },
    createTicketSuccess(state, action: PayloadAction<any>): void {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { createTicketRequest, createTicketSuccess } =
  createTicketSlice.actions;
export const createTicketReducer = createTicketSlice.reducer;
