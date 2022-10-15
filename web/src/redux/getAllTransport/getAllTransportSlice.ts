import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTransport } from '../../types';
import { TAllTransportState } from './getAllTransportTypes';

const INITIAL_STATE: TAllTransportState = {
  error: false,
  loading: false,
  data: [],
};

export const getTransportSlice = createSlice({
  name: 'getTransport',
  initialState: INITIAL_STATE,
  reducers: {
    getAllTransportRequest(state): void {
      state.loading = true;
    },
    getAllTransportSuccess(state, action: PayloadAction<TTransport[]>): void {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { getAllTransportRequest, getAllTransportSuccess } =
  getTransportSlice.actions;
export const getAllTransportReducer = getTransportSlice.reducer;
