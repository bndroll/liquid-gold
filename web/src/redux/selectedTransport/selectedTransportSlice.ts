import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTransport } from '../../types';
import { TSelectedTransportState } from './selectedTransportTypes';

const INITIAL_STATE: TSelectedTransportState = {
  data: undefined,
};

export const selectedTransportSlice = createSlice({
  name: 'selectedCar',
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedTransport(state, action: PayloadAction<TTransport>): void {
      state.data = action.payload;
    },
  },
});

export const { setSelectedTransport } = selectedTransportSlice.actions;
export const selectedTransportReducer = selectedTransportSlice.reducer;
