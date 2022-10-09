import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTestState } from './testTypes';

const INITIAL_STATE: TTestState = {
  data: '',
  loading: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState: INITIAL_STATE,
  reducers: {
    // указать конкретный тип
    testRequest(state, action: PayloadAction<any>): void {
      state.loading = true;
    },
    testRequestSuccess(state, action: PayloadAction<any>): void {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { testRequest, testRequestSuccess } = testSlice.actions;
export const testReducer = testSlice.reducer;
