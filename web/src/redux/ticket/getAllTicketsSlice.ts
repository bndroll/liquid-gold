import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTicket } from '../../types/tickets';
import { TGetAllTicketsState } from './getAllTicketsTypes';

const INITIAL_STATE: TGetAllTicketsState = {
  loading: false,
  error: false,
  data: [],
};

const getAllTicketsSlice = createSlice({
  name: 'getMyTickets',
  initialState: INITIAL_STATE,
  reducers: {
    getAllTicketsRequest(state, _action: PayloadAction<any>): void {
      state.loading = true;
    },
    getAllTicketsSuccess(state, action: PayloadAction<TTicket[]>): void {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { getAllTicketsRequest, getAllTicketsSuccess } =
  getAllTicketsSlice.actions;
export const getAllTicketsReducer = getAllTicketsSlice.reducer;
