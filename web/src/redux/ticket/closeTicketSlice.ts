import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const closeTicketSlice = createSlice({
  name: 'closeTicker',
  initialState: {
    loading: false,
    data: null,
  },
  reducers: {
    closeTicketRequest(state, action: PayloadAction<any>): void {
      state.loading = true;
    },
    closeTicketSuccess(state): void {
      state.loading = false;
    },
  },
});

export const { closeTicketRequest, closeTicketSuccess } =
  closeTicketSlice.actions;
export const closeTicketReducer = closeTicketSlice.reducer;
