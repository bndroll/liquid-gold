import { all, fork } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { testWatcher } from './testSaga/testSaga';
import { authWathcer } from './auth/authSaga';
import { getUserWatcher } from './getUser/getUserSaga';
import { getAllTransportWatcher } from './getAllTransport/getAllTransportSaga';

export default function* rootSaga(): SagaIterator {
  yield all([
    fork(testWatcher),
    fork(authWathcer),
    fork(getUserWatcher),
    fork(getAllTransportWatcher),
  ]);
}
