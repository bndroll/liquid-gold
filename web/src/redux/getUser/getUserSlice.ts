import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserRes } from '../../types/user';
import { TUserState } from './getUserTypes';

const INITIAL_STATE: TUserState = {
  error: false,
  loading: false,
  data: undefined,
};

export const getUserSlice = createSlice({
  name: 'getUser',
  initialState: INITIAL_STATE,
  reducers: {
    getUserRequest(state): void {
      console.log('request');
      state.loading = true;
    },
    getUserSuccess(state, action: PayloadAction<TUserRes>): void {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { getUserRequest, getUserSuccess } = getUserSlice.actions;
export const getUserReducer = getUserSlice.reducer;
