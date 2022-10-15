import { SagaIterator } from 'redux-saga';
import { authRequest, authSuccess } from './authSlice';
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { TAuthRes } from '../../types';
import { makeAuth } from './serivce';

export function* authWorker(
  action: ReturnType<typeof authRequest>
): SagaIterator {
  try {
    const response: TAuthRes = yield call(makeAuth, action.payload);
    yield put(authSuccess(response));
  } catch (e) {
    console.log(e);
  }
}

export function* authWathcer(): SagaIterator {
  yield takeEvery(authRequest.type, authWorker);
}
