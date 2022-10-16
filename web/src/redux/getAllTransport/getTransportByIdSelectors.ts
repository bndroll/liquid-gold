import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { TGetTransportByIdState } from './getTransportByIdTypes';

const getTransportByIdState = (state: RootState): TGetTransportByIdState =>
  state.getTransportById;

export const selectTransportById = createSelector(
  getTransportByIdState,
  (getTransportByIdState) => getTransportByIdState.data
);
