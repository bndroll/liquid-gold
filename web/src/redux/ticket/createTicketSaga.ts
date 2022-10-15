import { SagaIterator } from 'redux-saga';
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { createTicketRequest, createTicketSuccess } from './createTicketSlice';
import { createTicket } from './service';
import history from '../../history';
import { APP_ROUTES } from '../../constants/routes';

export function* createTicketWorker(
  action: ReturnType<typeof createTicketRequest>
): SagaIterator {
  try {
    const response = yield call(createTicket, action.payload);
    yield put(createTicketSuccess(response));
    history.push(APP_ROUTES.createTicketTransport.path);
  } catch (e) {
    console.log(e);
  }
}

export function* createTicketWatcher(): SagaIterator {
  yield takeEvery(createTicketRequest.type, createTicketWorker);
}
