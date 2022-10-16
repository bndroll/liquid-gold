import { SagaIterator } from 'redux-saga';
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { getAllTickets } from './service';
import {
  getAllTicketsRequest,
  getAllTicketsSuccess,
} from './getAllTicketsSlice';

export function* getAllTicketsWorker(
  action: ReturnType<typeof getAllTicketsRequest>
): SagaIterator {
  try {
    const response = yield call(getAllTickets);
    yield put(getAllTicketsSuccess(response));
  } catch (e) {
    console.log(e);
  }
}

export function* getAllTicketsWatcher(): SagaIterator {
  yield takeEvery(getAllTicketsRequest.type, getAllTicketsWorker);
}
