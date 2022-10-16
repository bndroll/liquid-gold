import { SagaIterator } from 'redux-saga';
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { closeTicketRequest, closeTicketSuccess } from './closeTicketSlice';
import { closeTicket } from './service';
import history from '../../history';
import { APP_ROUTES } from '../../constants/routes';

export function* closeTicketWorker(
  action: ReturnType<typeof closeTicketRequest>
): SagaIterator {
  try {
    const response = yield call(closeTicket, action.payload.id);
    yield put(closeTicketSuccess());
    history.push(APP_ROUTES.allTickets.path);
  } catch (e) {
    console.log(e);
  }
}

export function* closeTicketWatcher(): SagaIterator {
  yield takeEvery(closeTicketRequest.type, closeTicketWorker);
}
