import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTransport, TUserRes } from '../../types';
import { TGetTransportByIdState } from './getTransportByIdTypes';

const INITIAL_STATE: TGetTransportByIdState = {
  data: null,
  loading: false,
};

const getTransportByIdSlice = createSlice({
  name: 'getUserById',
  initialState: INITIAL_STATE,
  reducers: {
    getTransportByIdRequest(state, action: PayloadAction<any>): void {
      state.loading = true;
    },
    getTransportByIdSuccess(state, action: PayloadAction<TTransport>): void {
      state.loading = false;
      state.data = action.payload;
    },
    resetTransportById(state): void {
      state.data = null;
    },
  },
});

export const {
  getTransportByIdRequest,
  getTransportByIdSuccess,
  resetTransportById,
} = getTransportByIdSlice.actions;
export const getTransportByIdReducer = getTransportByIdSlice.reducer;
