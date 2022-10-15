import { SagaIterator } from 'redux-saga';
import { getUserRequest, getUserSuccess } from './getUserSlice';
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { getUser } from './service';

export function* getUserWorker(
  action: ReturnType<typeof getUserRequest>
): SagaIterator {
  try {
    const response = yield call(getUser);
    yield put(getUserSuccess(response));
  } catch (e) {
    console.log(e);
  }
}

export function* getUserWatcher(): SagaIterator {
  yield takeEvery(getUserRequest.type, getUserWorker);
}
