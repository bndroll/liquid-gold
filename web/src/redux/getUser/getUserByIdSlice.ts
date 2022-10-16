import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserRes } from '../../types';
import { TGetUserByIdState } from './getUserByIdTypes';

const INITIAL_STATE: TGetUserByIdState = {
  data: null,
  loading: false,
};

const getUserByIdSlice = createSlice({
  name: 'getUserById',
  initialState: INITIAL_STATE,
  reducers: {
    getUserByIdRequest(state, action: PayloadAction<any>): void {
      state.loading = true;
    },
    getUserByIdSuccess(state, action: PayloadAction<TUserRes>): void {
      state.loading = false;
      state.data = action.payload;
    },
    resetUserById(state): void {
      state.data = null;
    },
  },
});

export const { getUserByIdRequest, getUserByIdSuccess, resetUserById } =
  getUserByIdSlice.actions;
export const getUserByIdReducer = getUserByIdSlice.reducer;
