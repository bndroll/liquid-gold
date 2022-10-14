import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuthReq, TAuthRes } from '../../types';
import { TAuthState } from './authTypes';

const INITIAL_STATE: TAuthState = {
  error: false,
  loading: false,
  data: {
    access_token: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    authRequest(state, _action: PayloadAction<TAuthReq>): void {
      state.loading = true;
    },
    authSuccess(state, action: PayloadAction<TAuthRes>): void {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { authRequest, authSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
