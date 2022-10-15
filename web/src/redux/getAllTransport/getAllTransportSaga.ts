import { takeEvery, call, put } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import {
  getAllTransportRequest,
  getAllTransportSuccess,
} from './getAllTransportSlice';
import { getAllTransport } from './service';

export function* getAllTransportWorker(
  action: ReturnType<typeof getAllTransportRequest>
): SagaIterator {
  try {
    const response = yield call(getAllTransport);
    yield put(getAllTransportSuccess(response));
  } catch (e) {
    console.log(e);
  }
}

export function* getAllTransportWatcher(): SagaIterator {
  yield takeEvery(getAllTransportRequest.type, getAllTransportWorker);
}
