import { PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authReducer } from './auth/authSlice';
import { getAllTransportReducer } from './getAllTransport/getAllTransportSlice';
import { getTransportByIdReducer } from './getAllTransport/getTransportByIdSlice';
import { getUserByIdReducer } from './getUser/getUserByIdSlice';
import { getUserReducer } from './getUser/getUserSlice';
import { selectedTransportReducer } from './selectedTransport/selectedTransportSlice';
import { testReducer } from './testSaga/testSlice';
import { closeTicketReducer } from './ticket/closeTicketSlice';
import { createTicketReducer } from './ticket/createTicketSlice';
import { getAllTicketsReducer } from './ticket/getAllTicketsSlice';
import { getMyTicketsReducer } from './ticket/getMyTicketsSlice';

const appReducer = combineReducers({
  test: testReducer,
  auth: authReducer,
  getUser: getUserReducer,
  getTransport: getAllTransportReducer,
  selectedTransport: selectedTransportReducer,
  createTicket: createTicketReducer,
  getMyTickets: getMyTicketsReducer,
  getUserById: getUserByIdReducer,
  getTransportById: getTransportByIdReducer,
  getAllTickets: getAllTicketsReducer,
  closeTicket: closeTicketReducer,
});

const rootReducer = (state: any, action: PayloadAction<any>) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
