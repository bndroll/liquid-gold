import { takeEvery, put, call } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { TTransport, TUserRes } from '../../types';
import {
  getTransportByIdRequest,
  getTransportByIdSuccess,
} from './getTransportByIdSlice';
import { getTransportById } from './service';

export function* getTransportByIdWorker(
  action: ReturnType<typeof getTransportByIdRequest>
): SagaIterator {
  try {
    console.log(action.payload);
    const response: TTransport = yield call(
      getTransportById,
      action.payload.id
    );
    yield put(getTransportByIdSuccess(response));
  } catch (e) {}
}

export function* getTransportByIdWatcher(): SagaIterator {
  yield takeEvery(getTransportByIdRequest.type, getTransportByIdWorker);
}
