import { all, fork } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { testWatcher } from './testSaga/testSaga';

export default function* rootSaga(): SagaIterator {
  yield all([fork(testWatcher)]);
}
