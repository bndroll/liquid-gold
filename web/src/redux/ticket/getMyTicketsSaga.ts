import { SagaIterator } from 'redux-saga';
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { getMyTicketsRequest, getMyTicketsSuccess } from './getMyTicketsSlice';
import { getMyTickets } from './service';

export function* getMyTicketsWorker(
  action: ReturnType<typeof getMyTicketsRequest>
): SagaIterator {
  try {
    const response = yield call(getMyTickets);
    yield put(getMyTicketsSuccess(response));
  } catch (e) {
    console.log(e);
  }
}

export function* getMyTicketsWatcher(): SagaIterator {
  yield takeEvery(getMyTicketsRequest.type, getMyTicketsWorker);
}
