import { all, fork } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { testWatcher } from './testSaga/testSaga';
import { authWathcer } from './auth/authSaga';
import { getUserWatcher } from './getUser/getUserSaga';
import { getAllTransportWatcher } from './getAllTransport/getAllTransportSaga';
import { createTicketWatcher } from './ticket/createTicketSaga';
import { getMyTicketsWatcher } from './ticket/getMyTicketsSaga';
import { getUserByIdWatcher } from './getUser/getUserByIdSaga';
import { getTransportByIdWatcher } from './getAllTransport/getTransportByIdSaga';
import { getAllTicketsWatcher } from './ticket/getAllTicketsSaga';
import { closeTicketWatcher } from './ticket/closeTicketSaga';

export default function* rootSaga(): SagaIterator {
  yield all([
    fork(testWatcher),
    fork(authWathcer),
    fork(getUserWatcher),
    fork(getAllTransportWatcher),
    fork(createTicketWatcher),
    fork(getMyTicketsWatcher),
    fork(getUserByIdWatcher),
    fork(getTransportByIdWatcher),
    fork(getAllTicketsWatcher),
    fork(closeTicketWatcher),
  ]);
}
