import { put, takeEvery } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { testRequest, testRequestSuccess } from './testSlice';

//указывать конкретный тип
export function* testWorker(action: ReturnType<any>): SagaIterator {
  yield put(testRequestSuccess(action.payload));
}

export function* testWatcher(): SagaIterator {
  yield takeEvery(testRequest.type, testWorker);
}
